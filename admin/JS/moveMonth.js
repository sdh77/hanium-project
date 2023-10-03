const leftBtn = document.querySelector(
  ".toDayOrder__list .calendar .calendar_grid .moveLeft"
);
const rightBtn = document.querySelector(
  ".toDayOrder__list .calendar .calendar_grid .moveRight"
);
function moveLeft() {
  let yearMonth = document.querySelector(
    ".toDayOrder__list .calendar .calendar_grid .yearMonth"
  ).innerHTML;
  let year = Number(yearMonth.substr(0, 4));
  let month = Number(yearMonth.substr(6, 2));
  month = month - 1;
  if (month == 0) {
    year = year - 1;
    month = 12;
  }
  if (selectMonth == month && selectYear == year) newDate = date;
  else
    newDate =
      String(year).padStart(2, "0") +
      "-" +
      String(month).padStart(2, "0") +
      "-";
  loadpageOrderList(newDate);
}

function moveRight() {
  let yearMonth = document.querySelector(
    ".toDayOrder__list .calendar .calendar_grid .yearMonth"
  ).innerHTML;
  let year = Number(yearMonth.substr(0, 4));
  let month = Number(yearMonth.substr(6, 2));
  month = month + 1;
  if (month == 13) {
    year = year + 1;
    month = 1;
  }
  if (selectMonth == month && selectYear == year) newDate = date;
  else
    newDate =
      String(year).padStart(2, "0") +
      "-" +
      String(month).padStart(2, "0") +
      "-";
  loadpageOrderList(newDate);
}

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
