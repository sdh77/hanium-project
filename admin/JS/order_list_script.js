let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;
let sort = "";
const btn__order = document.querySelector(".toDayOrder__btn .btn__order");
function changeSort() {
  if (sort == "cnt") sort = "";
  else sort = "cnt";
  loadpageOrderList();
}

//로드 페이지
function loadpageOrderList() {
  let params = {
    Date: date,
    Sort: sort,
  };

  $.ajax({ url: "showtoDayOrderList.php", type: "get", data: params }).done(
    function (data) {
      $(".toDayOrder__list").html(data);
    }
  );
}

window.onload = loadpageOrderList();
btn__order.addEventListener("click", changeSort);
