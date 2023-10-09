var finishTables = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem"
);

function scrollchef() {
  tagwidth = finishTables[0].offsetWidth;
  console.dir(tagwidth);
  clearTableNum = localStorage.getItem("clearTableNum");
  document
    .querySelector(".main-screen .main-area")
    .scrollTo(tagwidth * clearTableNum, 0);
}
