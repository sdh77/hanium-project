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

  let params = {
    action: select,
  };
  $.ajax({ url: "showtoDayOrderList.php", type: "get", data: params }).done(
    function (data) {
      $(".popup").html(data);
    }
  );
}
