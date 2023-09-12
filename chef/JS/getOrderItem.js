const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");
let mode = 1;

function orderItem() {
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 관리";
  $.ajax({ url: "postItem.php", type: "get" }).done(function (data) {
    $(".bottom-area").html(data);
    set_time();
  });
  btn.removeEventListener("click", orderItem);
  btn.addEventListener("click", soldout);
  mode = 0;
}

function soldout() {
  btn.innerHTML = "주문 관리";
  header.innerHTML = "재고 관리";
  $.ajax({ url: "soldout.php", type: "get" }).done(function (data) {
    $(".bottom-area").html(data);
  });
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", orderItem);
  mode = 1;
}
orderItem();
if (mode) setInterval(orderItem, 5000);
