var finishMenus = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem .orderdetail_list"
);
var clearMenus = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItemCLEAR .orderdetail_list"
);
var finishTables = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem"
);

var newCnt = finishMenus.length + clearMenus.length;
// console.log(newCnt);
if (newCnt != Number(localStorage.getItem("menuCnt"))) {
  alert("new");
}
localStorage.setItem("menuCnt", newCnt);

finishMenus.forEach(function (finishMenu) {
  finishMenu.addEventListener("click", function () {
    finishMenu.classList.add("clear");
    console.log(finishMenu.classList.item(1));
    let params = {
      orderId: finishMenu.classList.item(1),
    };
    $.ajax({ url: "clearMenu.php", type: "get", data: params });
    checkTable();
  });
});

function checkTable() {
  let check = 0;
  let cnt = 0;
  let tableclearNum = 0;
  finishTables.forEach(function (finishTable) {
    console.log(finishTable);
    finishTable
      .querySelectorAll(".orderdetail_list")
      .forEach(function (checkClear) {
        if (checkClear.classList.item(2) == "clear") check++;
        cnt++;
        // console.log(cnt, check);
      });
    // console.log(check, cnt);
    if (check == cnt) {
      finishTable.classList.add("hide");
      finishTable
        .querySelectorAll(".orderdetail_list")
        .forEach(function (checkClear) {
          let params = {
            orderId: checkClear.classList.item(1),
          };
          $.ajax({ url: "clearTable.php", type: "get", data: params });
        });
      check = 0;
      cnt = 0;
      tableclearNum = tableclearNum + 1;
    } else {
      check = 0;
      cnt = 0;
    }
  });
  localStorage.setItem("clearTableNum", tableclearNum);
  orderItem();
}

scrollchef();
function scrollchef() {
  const vh = window.innerWidth * 0.01;
  clearTableNum = localStorage.getItem("clearTableNum");
  console.dir(vh * 16 * clearTableNum);
  document
    .querySelector(".main-screen .main-area")
    .scrollTo(vh * 16 * clearTableNum, 0);
}

window.onload = function () {
  scrollchef();
};
// document.querySelector(".main-screen .main-area").scrollTo(40000, 0);
