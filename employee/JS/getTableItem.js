let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

/*
var soldOutTags = document.querySelectorAll(".main-area .chefgrid .soldout");

function alterSoldOut(target) {
  let name = target.querySelector("p").innerText;
  let soldout = target.classList.item(1);
  if (soldout == "yes") {
    target.classList.remove("yes");
    console.log(target.className);
    getTableItem();
  } else {
    target.classList.add("yes");
    console.log(target.className);
    getTableItem();
  }
}
soldOutTags.forEach((target) => {
  target.addEventListener("click", function () {
    alterSoldOut(target);
  });
});
*/
getTableItem();

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
