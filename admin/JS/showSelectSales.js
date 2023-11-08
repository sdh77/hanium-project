const selectPopup = document.querySelector(".background");

const selectLists = document.querySelectorAll(".resetCalendar");

selectLists.forEach((selectList) => {
  selectList.addEventListener("click", function () {
    let select = selectList.innerHTML;
    showSelectSales(select);
  });
});
// console.log(selects);

function showSelectSales(select) {
  selectPopup.classList.add("show");
  console.log(date);
  let params = {
    action: select,
    Date: Number(date.substr(0, 4)),
  };
  $.ajax({ url: "showtoDayOrderList.php", type: "get", data: params }).done(
    function (data) {
      $(".popup").html(data);
    }
  );
}

window.addEventListener("click", function (event) {
  if (event.target.className == "window") {
    selectPopup.classList.remove("show");
  }
});
