const updateBtns = document.querySelectorAll(".list span .btn .update");
const popup = document.querySelector(".background");
console.log(updateBtns);
function show(target) {
  let id = target.parentNode.parentNode.querySelector(".id").innerText;
  popup.classList.add("show");
  loadUpdatePage(id);
}

function hide() {
  popup.classList.remove("show");
}

//로드 페이지
function loadUpdatePage(id) {
  let params = {
    newid: id,
  };
  $.ajax({ url: "update.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".popup").html(data);
  });
}

updateBtns.forEach((target) => {
  target.addEventListener("click", function () {
    show(target);
  });
});

function loadInsertPage() {
  popup.classList.add("show");
  $.ajax({ url: "insert.php" }).done(function (
    data
  ) {
    $(".popup").html(data);
  });
}
