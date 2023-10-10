const leftYearBtn = document.querySelector(".yearbtn_left");
const rightYearBtn = document.querySelector(".yearbtn_right");

function moveYearLeft() {
  let year = document.querySelector(
    ".salesTodayHeader__arr .salesTodayHeader"
  ).innerHTML;
  year = Number(year) - 1;
  console.log(year);
  // document.querySelector(".salesTodayHeader__arr .salesTodayHeader").innerHTML =
  // year;
  loadpageYearSolds(year);
}

function moveYearRight() {
  let year = document.querySelector(
    ".salesTodayHeader__arr .salesTodayHeader"
  ).innerHTML;
  console.log(year);

  year = Number(year) + 1;
  console.log(year);
  // document.querySelector(".salesTodayHeader__arr .salesTodayHeader").innerHTML =
  // year;

  loadpageYearSolds(year);
}

function loadpageYearSolds(newDate) {
  let params = {
    Date: newDate,
    action: "월 매출",
  };
  $.ajax({ url: "showtoDayOrderList.php", type: "get", data: params }).done(
    function (data) {
      $(".popup").html(data);
    }
  );
}

leftYearBtn.addEventListener("click", moveYearLeft);
rightYearBtn.addEventListener("click", moveYearRight);
