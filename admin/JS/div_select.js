const divs = document.querySelectorAll(".listselect a");

function change_check() {
  divs.forEach(function (div) {
    div.classList.remove("click");
  });
  event.currentTarget.classList.add("click");
}
