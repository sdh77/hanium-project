$(document).ready(function () {
  // do: 주문 시작 시 테이블 번호 생성. (지금은 랜덤이고 추후에 각각 설정)
  console.log("Order Start!!");
  const tableID = generateTableNumber();
  console.log(tableID);
  $("#table-number").text(tableID);

  $.ajax({ url: "list_div.php", type: "get" }).done(function (data) {
    $("#menupage").html(data);

    let menuImg, menuName, menuPrice, menuQuantity;

    // do: 메뉴 클릭 이벤트 핸들러 (메뉴 장바구니에 담기)
    $(document).off("click", ".noSoldOut");
    $(document).on("click", ".noSoldOut", function () {
      // 애니메이션 효과
      $(this).animate({ opacity: 0.3 }, 80, function () {
        $(this).animate({ opacity: 1 }, 80);
      });

      $(".shoppingCart-popup")
        .removeClass("area-hidden")
        .addClass("area-visible");

      menuImg = $(this).find("#menu-img").attr("src");
      menuName = $(this).find(".menu").text();
      menuPrice = Number($(this).find(".price").text().replace(",", ""));
      menuQuantity = 1;

      // 장바구니 팝업창
      $(".shoppingCart-popup-closeBtn").click(function () {
        $(".shoppingCart-popup")
          .removeClass("area-visible")
          .addClass("area-hidden");
        $(".shoppingCart-popup-informQuantity").text("1");
        $(".shoppingCart-popup-quantityInt").text("1");
      });
      $(".shoppingCart-popup-img").attr("src", menuImg);
      $(".shoppingCart-popup-informMenuDB").text(menuName);
      $(".shoppingCart-popup-quantityIncrease")
        .off("click")
        .on("click", function () {
          console.log("1");
          popupincreaseQuantity(
            $(this).siblings(".shoppingCart-popup-quantityInt")
          );
          menuQuantity = parseInt($(".shoppingCart-popup-quantityInt").text());
          popupincreaseQuantity(
            $(this)
              .closest(".shoppingCart-popup-4")
              .siblings(".shoppingCart-popup-3")
              .find(".shoppingCart-popup-informQuantity")
          );
        });
      $(".shoppingCart-popup-quantityDecrease").click(function () {
        popupdecreaseQuantity(
          $(this).siblings(".shoppingCart-popup-quantityInt")
        );
        menuQuantity = parseInt($(".shoppingCart-popup-quantityInt").text());
        popupdecreaseQuantity(
          $(this)
            .closest(".shoppingCart-popup-4")
            .siblings(".shoppingCart-popup-3")
            .find(".shoppingCart-popup-informQuantity")
        );
      });
    });
    $(".shoppingCart-popup-okBtn")
      .off("click")
      .on("click", function () {
        // 이미 장바구니에 담은 메뉴라면?
        let isExist = false;
        let cartquantity, newitemprice, olditemprice;
        $("#cart .cart-item:visible").each(function () {
          if ($(this).find(".menu-name").text() == menuName) {
            let totalPriceText = $("#total-price").text();
            let totalPrice = parseInt(totalPriceText.replace(/,/g, ""));
            cartquantity = parseInt($(this).find(".quantity").text());
            olditemprice = parseInt(
              $(this).find(".item-price").text().replace(",", "")
            );

            cartquantity += menuQuantity;
            newitemprice = menuPrice * menuQuantity;
            olditemprice += newitemprice;
            totalPrice += newitemprice;
            console.log("crazy::", totalPrice);

            $(this).find(".quantity").text(cartquantity);
            $(this)
              .find(".item-price")
              .text(
                olditemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            $(this)
              .find(".single-price")
              .text(
                olditemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            $("#total-price").text(
              totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
            isExist = true;
            return false;
          }
        });
        if (!isExist) {
          addToCart3(menuImg, menuName, menuPrice, menuQuantity);
        } else {
          console.log("장바구니에 이미 있음");
        }
        $(".shoppingCart-popup")
          .removeClass("area-visible")
          .addClass("area-hidden");
        $(".shoppingCart-popup-informQuantity").text("1");
        $(".shoppingCart-popup-quantityInt").text("1");
      });
  });

  // 초기 화면에 노출되는 요소
  //$(".bottomBtn-area").addClass("area-visible");
  //$(".shop-area").addClass("area-hidden");
  $(".shop-area").addClass("area-visible"); // 장바구니 숨기는 기능 취소
  $(".shoppingCart-popup").addClass("area-hidden");
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
    document.querySelector(".chatArea").style.display = "block";
    document.querySelector(".chatdisplayArea").style.display = "none";
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
    };
    $.ajax({ url: "callSend.php", type: "get", data: order });
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

// do: 채팅 기능 chat-area 화면 전환 버튼 -> chat_script.js
document
  .querySelector(".chatArea-voicebox")
  .addEventListener("click", function () {
    document.querySelector(".chatArea").style.display = "none";
    document.querySelector(".chatdisplayArea").style.display = "block";
  });

// do: 장바구니 테이블 번호. 지금은 랜덤으로
function generateTableNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

setInterval(loadpage_list, 10000);
