var finishMenus = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem .orderdetail_list"
);

var finishTables = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem"
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
  finishTables.forEach(function (finishTable) {
    console.log(finishTable);
    finishTable
      .querySelectorAll(".orderdetail_list")
      .forEach(function (checkClear) {
        if (checkClear.classList.item(2) == "clear") check++;
        cnt++;
        console.log(cnt, check);
      });
    console.log(check, cnt);
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
document.querySelector(".main-screen .main-area").scrollTo(1000, 0);
