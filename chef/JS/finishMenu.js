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
// console.log(newCnt);
// console.log(clearCntCheck);
// console.log(newCnt);

if (newCnt > Number(localStorage.getItem("menuCnt"))) {
  alert("new");
  localStorage.setItem("menuCnt", newCnt);
} else if (newCnt < Number(localStorage.getItem("menuCnt"))) {
  if (localStorage.getItem("chefMode") == 1) {
    localStorage.setItem("menuCnt", newCnt);
  }
}

finishTables.forEach(function (finishTable) {
  finishTable.addEventListener("click", function () {
    const selectTableLists = finishTable.querySelectorAll(".orderdetail_list");
    let menuId = "(";
    selectTableLists.forEach(function (selectTableList, cnt = 1) {
      // console.log(selectTableList.classList.item(1));
      if (cnt == selectTableLists.length - 1)
        menuId = menuId + selectTableList.classList.item(1) + ")";
      else menuId = menuId + selectTableList.classList.item(1) + ", ";
      cnt++;
    });
    let params = {
      orderList: menuId,
    };
    $.ajax({ url: "clearAllMenu.php", type: "get", data: params });
    const tableNumber = finishTable.querySelector(".orderTableId").innerHTML;
    chromeTTS(tableNumber + "이 조리완료 되었습니다.");
  });
  checkTable();
});
Menus.forEach(function (finishMenu) {
  finishMenu.addEventListener("click", function () {
    finishMenu.classList.add("clear");
    // console.log(finishMenu);
    // console.log(finishMenu.classList.item(1));
    let params = {
      orderId: finishMenu.classList.item(1),
    };
    $.ajax({ url: "clearMenu.php", type: "get", data: params });
    const menuName = finishMenu.querySelector(".orderdetail_name").innerHTML;
    const tableNumber =
      finishMenu.parentElement.querySelector(".orderTableId").innerHTML;
    chromeTTS(tableNumber + menuName + "가 조리완료 되었습니다.");
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

var screenArea = document.querySelector(".main-screen .main-area");

// console.log(screenArea);
screenArea.addEventListener("scroll", function () {
  if (screenArea.scrollLeft <= 10) localStorage.setItem("chefMode", 1);
  else localStorage.setItem("chefMode", 0);
});
