$(document).ready(function () {
  // do: 주문 시작 시 테이블 번호 생성. (지금은 랜덤이고 추후에 각각 설정)
  console.log("Order Start!!");
  const tableID = generateTableNumber();
  console.log(tableID);
  $("#table-number").text(tableID);

  $.ajax({ url: "list_div.php", type: "get" }).done(function (data) {
    $("#menupage").html(data);

    // do: 메뉴 클릭 이벤트 핸들러 (메뉴 장바구니에 담기)
    $(document).off("click", ".noSoldOut");
    $(document).on("click", ".noSoldOut", function () {
      const menuImg = $(this).find("#menu-img").attr("src");
      const menuName = $(this).find(".menu").text();
      const menuPrice = Number($(this).find(".price").text().replace(",", ""));
      // 이미 장바구니에 담은 메뉴라면?
      let isExist = false;
      $("#cart .cart-item:visible").each(function () {
        if ($(this).find(".menu-name").text() == menuName) {
          increaseQuantity($(this).find(".quantity"));
          isExist = true;
          return false;
        }
      });
      if (!isExist) {
        addToCart2(menuImg, menuName, menuPrice);
      } else {
        console.log("장바구니에 이미 있음");
      }
    });
  });

  // 초기 화면에 노출되는 요소
  //$(".bottomBtn-area").addClass("area-visible");
  //$(".shop-area").addClass("area-hidden");
  $(".shop-area").addClass("area-visible"); // 장바구니 숨기는 기능 취소
  $(".serv-popup").addClass("area-hidden");

  // 장바구니 숨기기, 보이기
  /*
  $("#shop-button").click(function () {
    $(".bottomBtn-area").removeClass("area-visible").addClass("area-hidden");
    $(".shop-area").removeClass("area-hidden").addClass("area-visible");
  });*/
  // do: 장바구니 수량 조절
  $("#cart").on("click", ".increase", function () {
    increaseQuantity($(this).siblings(".quantity"));
  });
  $("#cart").on("click", ".decrease", function () {
    decreaseQuantity($(this).siblings(".quantity"));
  });
  // 장바구니 아이템 삭제 버튼
  $("#cart").on("click", ".cart-item-delete", function () {
    $(this).closest(".cart-item").remove();
    updatePrice();
  });
  // 장바구니 닫기 버튼
  /*
  $("#closeshop-button").click(function () {
    $(".bottomBtn-area").removeClass("area-hidden").addClass("area-visible");
    $(".shop-area").removeClass("area-visible").addClass("area-hidden");
  });*/
  // do: 주문
  $("#orderButton").click(function () {
    var cartItems = $(".cart-item:visible");

    var order = {
      tableid: $("#table-number").text(),
      items: [],
      type: "order",
    };

    cartItems.each(function () {
      var item = {
        name: $(this).find(".menu-name").text(),
        quantity: $(this).find(".quantity").text(),
      };
      order.items.push(item);
    });

    // 주문 정보를 서버에 전송
    $.ajax({
      url: "orderdetail.php",
      type: "POST",
      data: JSON.stringify(order),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
    $("#total-price").text(0);
    $(".cart-item").not(":first").remove();
    alert("주문 완료!!!");
  });

  // 직원 호출 service. orderdetail DB로 전송
  $("#serv-button").click(function () {
    $(".serv-popup").removeClass("area-hidden").addClass("area-visible");
  });
  $("#closepopup-button").click(function () {
    $(".serv-popup").removeClass("area-visible").addClass("area-hidden");
  });
  $(".servText").click(function () {
    var servicetext = $(this).text();
    var order = {
      tableid: $("#table-number").text(),
      serviceText: servicetext,
      type: "service",
    };
    $.ajax({
      url: "orderdetail.php",
      type: "POST",
      data: JSON.stringify(order),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});

function change_check() {
  var clicklists = document.querySelectorAll(".menu");
  clicklists.forEach(function (clicklist) {
    clicklist.classList.remove("click");
  });
  event.currentTarget.classList.add("click");
}

function change_order() {
  var clicklists = document.querySelectorAll(".order");
  clicklists.forEach(function (clicklist) {
    clicklist.classList.remove("click");
  });
  event.currentTarget.classList.add("click");
}
function clear_order() {
  var clicklists = document.querySelectorAll(".order");
  clicklists.forEach(function (clicklist) {
    clicklist.classList.remove("click");
  });
}

//기능 구현 페이지 전환
page = 0;
function uppage() {
  page++;
  loadpage_list();
}

function downpage() {
  if (page > 0) {
    page--;
  }
  loadpage_list();
}

//목차 변경
type = "all";
function set_type(newtype) {
  type = newtype;
  page = 0;
  loadpage_list();
}

//정렬기준 변경
order = "";
function set_order(neworder) {
  if (order == neworder) {
    order = "";
    clear_order();
  } else order = neworder;
  page = 0;
  loadpage_list();
}

//버튼으로 인한 페이지 변경
function changepage(num) {
  page = num;
  loadpage_list();
}

//검색 기능
function mysearch() {
  var search_text = document.getElementById("searchtext").value;
  var params = {
    newsearch: search_text,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  });
}

//로드 페이지
function loadpage_list() {
  var params = {
    newpage: page,
    newtype: type,
    neworder: order,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  });
}

// do: 채팅 기능 chat-area 화면 전환 버튼
document.querySelector(".voice-box").addEventListener("click", function () {
  document.querySelector(".chat-area").style.display = "none";
  document.querySelector(".chatdisplay-area").style.display = "block";
});
// 채팅 기능 (chat-bot)
document.querySelector("#sendMessage").addEventListener("click", function () {
  const userMessage = document.querySelector("#userMessage").value;

  if (userMessage.trim() !== "") {
    addMessageToChat("user", userMessage);
    const botResponse = getBotResponse(userMessage);
    addMessageToChat("bot", botResponse);
  }

  document.querySelector("#userMessage").value = "";
});
function addMessageToChat(sender, message) {
  const chatMessage = document.querySelector(".chat-message");
  const messageDiv = document.createElement("div");
  messageDiv.className = sender;
  messageDiv.textContent = message;
  chatMessage.appendChild(messageDiv);
}
function getBotResponse(message) {
  switch (message) {
    case "안녕":
      return "안녕하세요!";
    case "추천메뉴 알려줘":
      return "오늘의 추천메뉴는 부채살 스테이크입니다.";
    case "주문.":
      setTimeout(function () {
        $("#orderButton").trigger("click");
        document.querySelector(".chat-message").innerHTML = "";
        document.querySelector(".chat-area").style.display = "block";
        document.querySelector(".chatdisplay-area").style.display = "none";
        // $("#total-price").text(0);
        // $(".cart-item").not(":first").remove();
      }, 3000);
      return "주문이 완료되었습니다!";
      break;
    default:
      return "무슨 말인지 모르겠어요.";
  }
}

// do: 장바구니 테이블 번호. 지금은 랜덤으로
function generateTableNumber() {
  return Math.floor(Math.random() * 10) + 1;
}
// 장바구니에 메뉴 추가
function addToCart2(menuImg, menuName, menuPrice) {
  let cartItem = $("#cart .cart-item").first().clone(true);

  cartItem.find(".menu-imgsrc").attr("src", menuImg);
  cartItem.find(".menu-name").text(menuName);
  cartItem
    .find(".item-price")
    .text(menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  cartItem
    .find(".single-price")
    .text(menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  $("#cart").append(cartItem);

  cartItem.show();
  updatePrice();
}
// 장바구니 수량 증감
function increaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.text());
  quantityElement.text(quantity + 1);
  updatePrice();
}
function decreaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.text());
  if (quantity > 1) {
    quantityElement.text(quantity - 1);
  } else {
    quantityElement.closest(".cart-item").remove();
  }
  updatePrice();
}
// 장바구니 가격 업데이트
function updatePrice() {
  let grandTotal = 0;

  $(".cart-item").each(function () {
    const quantity = parseInt($(this).find(".quantity").text());
    const singlePrice = parseInt(
      $(this).find(".single-price").text().replace(",", "")
    );
    const totalPrice = singlePrice * quantity;

    if (!isNaN(totalPrice)) {
      $(this)
        .find(".item-price")
        .text(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      grandTotal += totalPrice;
      console.log(grandTotal);
    }
  });

  $("#total-price").text(
    grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}
