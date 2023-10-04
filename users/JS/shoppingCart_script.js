// 장바구니 수량 증감
function increaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.text());
  quantityElement.text(quantity + 1);
  updatePrice();
}
function popupincreaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.text());
  quantityElement.text(quantity + 1);
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
function popupdecreaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.text());
  quantityElement.text(quantity - 1);
}

// 장바구니 가격 업데이트
function updatePrice() {
  let grandTotal = 0;

  $(".cart-item").each(function () {
    const quantity = parseInt($(this).find(".quantity").text());
    const fixedPrice = parseInt(
      $(this).find(".fixed-price").text().replace(",", "")
    );
    const totalPrice = fixedPrice * quantity;

    if (!isNaN(totalPrice)) {
      $(this)
        .find(".item-price")
        .text(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      grandTotal += totalPrice;
    }
  });

  $("#total-price").text(
    grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

let menuImg2, menuName2, menuPrice2, menuQuantity2;

// 장바구니 팝업창 기능 부여
function shoppingCartPopupFunction () {

//      $(".shoppingCart-popup")
  //      .removeClass("area-hidden")
    //    .ADDcLASS("AREA-VISIBLE");

      window.menuImg2 = $(".shoppingCart-popup-img").attr("src");
      window.menuName2 = $(".shoppingCart-popup-informMenuDB").text();
      window.menuPrice2 = parseInt($(".popupPrice").text());
      window.menuQuantity2 = 1;

  console.log(window.menuImg2);
  console.log(window.menuName2);
  console.log(window.menuPrice2);
  console.log(window.menuQuantity2);


      // 장바구니 팝업창
      $(".shoppingCart-popup-closeBtn").click(function () {
        $(".shoppingCart-popup")
          .removeClass("area-visible")
          .addClass("area-hidden");
        $(".shoppingCart-popup-informQuantity").text("1");
        $(".shoppingCart-popup-quantityInt").text("1");
      });
      //$(".shoppingCart-popup-img").attr("src", menuImg);
      //$(".shoppingCart-popup-informMenuDB").text(menuName);
      $(".shoppingCart-popup-quantityIncrease")
        .off("click")
        .on("click", function () {
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
          addToCart3(window.menuImg2, window.menuName2, window.menuPrice2, window.menuQuantity2);
        } else {
          console.log("장바구니에 이미 있음");
        }
        $(".shoppingCart-popup")
          .removeClass("area-visible")
          .addClass("area-hidden");
        $(".shoppingCart-popup-informQuantity").text("1");
        $(".shoppingCart-popup-quantityInt").text("1");
      });
}

// 팝업창에서 장바구니로 추가
// 장바구니에 메뉴 추가
function addToCart3(menuImg2, menuName2, menuPrice2, menuQuantity2) {
  let cartItem = $("#cart .cart-item").first().clone(true);
  let totalPriceText = $("#total-price").text();
  let totalPrice = parseInt(totalPriceText.replace(/,/g, ""));
  let cartEachPrice = 0;
  console.log(window.menuImg2);
  console.log(window.menuName2);
  console.log(window.menuPrice2);
  console.log(window.menuQuantity2);

  cartItem.find(".menu-imgsrc").attr("src", window.menuImg2);
  cartItem.find(".menu-name").text(window.menuName2);
  cartItem.find(".quantity").text(window.menuQuantity2);
  cartEachPrice = window.menuPrice2 * window.menuQuantity2;
  console.log(cartEachPrice);
  cartItem
    .find(".item-price")
    .text(cartEachPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  cartItem
    .find(".single-price")
    .text(cartEachPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  cartItem
    .find(".fixed-price")
    .text(window.menuPrice2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  totalPrice += cartEachPrice;
  $("#total-price").text(
    totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
  $("#cart").append(cartItem);

  cartItem.show();
}

