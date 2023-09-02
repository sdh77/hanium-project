const btn = document.querySelector(".top-area .change-page");
const header = document.querySelector(".top-area .header");
function orderItem() {
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 관리";
  $.ajax({ url: "postItem.php", type: "get" }).done(function (data) {
    $(".bottom-area").html(data);
  });
  btn.removeEventListener("click", orderItem);
  btn.addEventListener("click", soldout);
}

function soldout() {
  btn.innerHTML = "주문 관리";
  header.innerHTML = "재고 관리";
  $.ajax({ url: "soldout.php", type: "get" }).done(function (data) {
    $(".bottom-area").html(data);
  });
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", orderItem);
}

orderItem();
