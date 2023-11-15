$(document).ready(function () {
  // do: 주문 시작 시 테이블 번호 생성. (지금은 랜덤이고 추후에 각각 설정)

  localStorage.setItem("userState", 1);
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
        .on("click", popupIncreaseClickBtn);
      $(".shoppingCart-popup-quantityDecrease")
        .off("click")
        .on("click", popupDecreaseClickBtn);
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
  $(".shoppingCart-popup2").addClass("area-hidden");
  $(".serv-popup").addClass("area-hidden");

  // 장바구니 숨기기, 보이기
  /*
  $("#shop-button").click(function () {
    $(".bottomBtn-area").removeClass("area-visible").addClass("area-hidden");
    $(".shop-area").removeClass("area-hidden").addClass("area-visible");
  });*/
  // do: 장바구니 수량 조절
  $("#cart")
    .off("click", ".increase")
    .on("click", ".increase", function () {
      increaseQuantity($(this).siblings(".quantity"));
    });
  $("#cart")
    .off("click", ".decrease")
    .on("click", ".decrease", function () {
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

  $("#canselButton").click(function () {
    $(".shopcartAll-popup").removeClass("area-visible").addClass("area-hidden");
  });
  $("#closeshopcartAll-popup-button").click(function () {
    $(".shopcartAll-popup").removeClass("area-visible").addClass("area-hidden");
  });
  $("#orderList-popup__OkButton").click(function () {
    $(".orderList-popup").removeClass("area-visible").addClass("area-hidden");
  });

  $("#orderListButton_popup").click(function () {
    console.log($(".orderList-popup"));
    $(".orderList-popup").removeClass("area-hideen").addClass("area-visible");
    let params = {
      tableID: tableID,
    };
    $.ajax({
      url: "showOrderList.php",
      type: "get",
      data: params,
    }).done(function (data) {
      $(".orderList-popup__list").html(data);
    });
  });
  $("#orderButton_popup").click(function () {
    if ($(".cart-item:visible").length > 0) {
      $(".shopcartAll-popup")
        .removeClass("area-hideen")
        .addClass("area-visible");
      var cartItems = $(".cart-item:visible");
      let names = [];
      let quantitys = [];
      cartItems.each(function () {
        names.push($(this).find(".menu-name").text());
        quantitys.push($(this).find(".quantity").text());
      });
      console.log(names);
      let params = {
        names: names,
        quantitys: quantitys,
      };
      $.ajax({
        url: "showShopAllList.php",
        type: "get",
        data: params,
      }).done(function (data) {
        $(".shopcartAll_popup__list").html(data);
      });
    } else {
      alert("장바구니 비어있음!!!");
    }
  });

  // do: 주문
  $("#orderButton").click(function () {
    // 주문 정보를 서버에 전송
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
    // document.querySelector(".chatArea").style.display = "block";
    // document.querySelector(".chatdisplayArea").style.display = "none";
    alert("주문 완료!!!");
    localStorage.setItem(
      "orderNum",
      Number(localStorage.getItem("orderNum")) + 1
    );
    $(".shopcartAll-popup").removeClass("area-visible").addClass("area-hidden");
    if ($("#table-number").text() >= 100) {
      window.location.href = "index_kioski.html";
    } else {
      window.location.href = "index_tableorder.html";
    }
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

function change_check(targetElement) {
  var clicklists = document.querySelectorAll(".menu");
  clicklists.forEach(function (clicklist) {
    clicklist.classList.remove("click");
  });

  if (targetElement) {
    targetElement.classList.add("click");
    targetElement.click();
  } else if (event && event.currentTarget) {
    event.currentTarget.classList.add("click");
  }
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
  localStorage.setItem("userState", 1);
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
  localStorage.setItem("userState", 1);

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
  let userState = localStorage.getItem("userState");
  if (userState == 1) {
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
}

// do: 채팅 기능 chat-area 화면 전환 버튼 -> chat_script.js
document
  .querySelector(".chatArea-voicebox")
  .addEventListener("click", function () {
    document.querySelector(".chatArea").style.display = "none";
    document.querySelector(".chatdisplayArea").style.display = "block";
  });
document
  .querySelector(".chatdisplayArea-exitBtn")
  .addEventListener("click", function () {
    document.querySelector(".chatdisplayArea").style.display = "none";
    document.querySelector(".chatArea").style.display = "block";
  });

// do: 장바구니 테이블 번호. 지금은 랜덤으로
function generateTableNumber() {
  const nowUrl = window.location.pathname.split("/");
  nowMode = nowUrl[nowUrl.length - 1];
  console.log(nowMode);
  if (nowMode == "menu_tableorder.html") {
    return Math.floor(Math.random() * 10) + 1;
  } else {
    if (!localStorage.getItem("orderNum")) {
      localStorage.setItem("orderNum", 100);
    }
    return localStorage.getItem("orderNum");
  }
}

// setInterval(loadpage_list, 10000);

//document.addEventListener("DOMContentLoaded", function () {
const menuSwipe = document.querySelector(".menu-list");
console.log(menuSwipe);

//if(menuSwipe) {
// 드래그(스와이프) 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

// PC 클릭 이벤트 (드래그)
menuSwipe.addEventListener("mousedown", (e) => {
  console.log("mousedown", e.pageX);
  startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
});

menuSwipe.addEventListener("mouseup", (e) => {
  console.log("mouseup", e.pageX);
  endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    console.log("prev move");
    downpage();
  } else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    console.log("next move");
    uppage();
  }
});

// 모바일 터치 이벤트 (스와이프)
menuSwipe.addEventListener("touchstart", (e) => {
  console.log("touchstart", e.touches[0].pageX);
  startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
menuSwipe.addEventListener("touchend", (e) => {
  console.log("touchend", e.changedTouches[0].pageX);
  endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint < endPoint) {
    // 오른쪽으로 스와이프 된 경우
    console.log("prev move");
    downpage();
  } else if (startPoint > endPoint) {
    // 왼쪽으로 스와이프 된 경우
    console.log("next move");
    uppage();
  }
});
//}
//});
