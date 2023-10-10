var Menus = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem .orderdetail_list"
);
var clearMenus = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItemCLEAR .orderdetail_list"
);
var finishTables = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem"
);

var newCnt = Menus.length;
var clearCntCheck = clearMenus.length;
console.log(newCnt);
console.log(clearCntCheck);
// console.log(newCnt);

if (clearCntCheck == 0) {
  if (newCnt > Number(localStorage.getItem("menuCnt"))) {
    alert("new");
    localStorage.setItem("menuCnt", newCnt);
  } else if (newCnt < Number(localStorage.getItem("menuCnt"))) {
    localStorage.setItem("menuCnt", newCnt);
  }
}
Menus.forEach(function (finishMenu) {
  finishMenu.addEventListener("click", function () {
    finishMenu.classList.add("clear");
    console.log(finishMenu.classList.item(1));
    let params = {
      orderId: finishMenu.classList.item(1),
    };
    $.ajax({ url: "clearMenu.php", type: "get", data: params });
  });
  checkTable();
});

function checkTable() {
  let check = 0;
  let cnt = 0;
  let tableclearNum = 0;
  finishTables.forEach(function (finishTable) {
    // console.log(finishTable);
    finishTable
      .querySelectorAll(".orderdetail_list")
      .forEach(function (checkClear) {
        if (checkClear.classList.item(2) == "clear") check++;
        cnt++;
        // console.log(cnt, check);
      });
    // console.log(check, cnt);
    if (check == cnt) {
      finishTable.className = "tableOrderItemCLEAR";
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
}
