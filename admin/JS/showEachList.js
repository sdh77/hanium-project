const popup = document.querySelector(".background");
const showDays = document.querySelectorAll(
  ".toDayOrder__list .calendar .calendar_grid .showList"
);
function selectShowOrder(day) {
  popup.classList.add("show");
  let yearMonth = document.querySelector(
    ".toDayOrder__list .calendar .calendar_grid .yearMonth"
  ).innerHTML;
  let year = Number(yearMonth.substr(0, 4));
  let month = Number(yearMonth.substr(6, 2));
  let selectDay =
    String(year).padStart(2, "0") +
    "-" +
    String(month).padStart(2, "0") +
    "-" +
    String(day).padStart(2, "0");
  let params = {
    Date: selectDay,
  };
  $.ajax({ url: "showtoDayOrderList.php", type: "get", data: params }).done(
    function (data) {
      $(".popup").html(data);
    }
  );
}
function hide() {
  popup.classList.remove("show");
}
showDays.forEach((showDay) => {
  showDay.addEventListener("click", function () {
    let day = showDay.querySelector(".calendar_grid__day__num").innerHTML;
    selectShowOrder(day);
  });
});
