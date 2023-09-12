let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");
let mode = 1;

function customItems() {
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 현황";
  getTableItem();
  btn.removeEventListener("click", customItems);
  btn.addEventListener("click", soldout);
  mode = 0;
}

function soldout() {
  btn.innerHTML = "주문 현황";
  header.innerHTML = "재고 관리";
  getTableItem();
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", customItems);
  mode = 1;
}

getTableItem();
btn.addEventListener("click", customItems);

function getTableItem() {
  let params = {
    Date: date,
  };
  $.ajax({ url: "TableItem.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".main-screen").html(data);
  });
}
