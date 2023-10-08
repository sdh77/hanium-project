const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");

let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

localStorage.setItem("chefMode", 1);
localStorage.setItem("clearTableNum", 0);

function orderItem() {
  localStorage.setItem("chefMode", 1);
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 관리";

  getOrderItem();
  btn.removeEventListener("click", orderItem);
  btn.addEventListener("click", soldout);
  // window.scrollTo(100);
}

function soldout() {
  localStorage.setItem("chefMode", 0);
  btn.innerHTML = "주문 관리";
  header.innerHTML = "재고 관리";
  loadSoldOutPage();
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", orderItem);
}

function getOrderItem() {
  if (localStorage.getItem("chefMode") == 1) {
    let params = {
      today: date,
    };
    $.ajax({ url: "postItem.php", type: "get", data: params }).done(function (
      data
    ) {
      $(".main-screen").html(data);
      set_time();
    });
  }
}
function loadSoldOutPage() {
  $.ajax({ url: "soldout.php", type: "get" }).done(function (data) {
    $(".main-screen").html(data);
  });
}

orderItem();
// setInterval(getOrderItem, 1000);
