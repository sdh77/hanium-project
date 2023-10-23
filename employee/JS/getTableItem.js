let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");
localStorage.setItem("employeeMode", 1);

function customItems() {
  localStorage.setItem("employeeMode", 1);
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 현황";
  getTableItem();
  btn.removeEventListener("click", customItems);
  btn.addEventListener("click", soldout);
}

function soldout() {
  localStorage.setItem("employeeMode", 0);
  btn.innerHTML = "주문 현황";
  header.innerHTML = "재고 관리";
  soldOutPage();
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", customItems);
}

btn.addEventListener("click", customItems);

function getTableItem() {
  if (localStorage.getItem("employeeMode") == 1) {
    let params = {
      Date: date,
    };
    $.ajax({ url: "TableItem.php", type: "get", data: params }).done(function (
      data
    ) {
      $(".main-screen").html(data);
    });
  }
}

function soldOutPage() {
  let params = {
    Date: date,
  };
  $.ajax({ url: "soldout.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".main-screen").html(data);
  });
}

customItems();
// setInterval(getTableItem, 1000);
