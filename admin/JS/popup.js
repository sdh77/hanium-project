const updateBtns = document.querySelectorAll(".list span .update");
const popup = document.querySelector(".background");
const window = document.querySelector(".window");
window.addEventListener("click", function (event) {
  if (event.target.className == "window") {
    hide();
  }
});
function show(target) {
  let id = target.parentNode.querySelector(".id").innerText;
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
  $.ajax({ url: "insert.php" }).done(function (data) {
    $(".popup").html(data);
  });
}

function trashPage() {
  popup.classList.add("show");
  $.ajax({ url: "trashList.php" }).done(function (data) {
    $(".popup").html(data);
  });
}
