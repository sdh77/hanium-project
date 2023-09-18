const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");

let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

let mode = 1;

function orderItem() {
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 관리";
  let params = {
    today: date,
  };
  $.ajax({ url: "postItem.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".main-screen").html(data);
    set_time();
  });
  btn.removeEventListener("click", orderItem);
  btn.addEventListener("click", soldout);
  // window.scrollTo(100);
  mode = 0;
}

function soldout() {
  btn.innerHTML = "주문 관리";
  header.innerHTML = "재고 관리";
  $.ajax({ url: "soldout.php", type: "get" }).done(function (data) {
    $(".main-screen").html(data);
  });
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", orderItem);
  mode = 1;
}
orderItem();
if (mode) setInterval(orderItem, 10000);
