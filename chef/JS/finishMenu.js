var finishMenus = document.querySelectorAll(
  ".bottom-area .main-area .tableOrderItem .tableOrderItem__menu"
);

var finishTables = document.querySelectorAll(
  ".bottom-area .main-area .tableOrderItem"
);

var newCnt = finishMenus.length;
console.log(newCnt);
if (newCnt != Number(localStorage.getItem("menuCnt"))) {
  alert("new");
}
localStorage.setItem("menuCnt", newCnt);

finishMenus.forEach(function (finishMenu) {
  finishMenu.addEventListener("click", function () {
    finishMenu.classList.add("clear");
    checkTable();
  });
});

function checkTable() {
  let check = 0;
  let cnt = 0;
  finishTables.forEach(function (finishTable) {
    finishTable
      .querySelectorAll(".tableOrderItem__menu")
      .forEach(function (checkClear) {
        if (checkClear.classList.item(1) == "clear") check++;
        cnt++;
      });
    if (check == cnt) {
      finishTable.classList.add("hide");
      check = 0;
      cnt = 0;
    } else {
      check = 0;
      cnt = 0;
    }
  });
}
