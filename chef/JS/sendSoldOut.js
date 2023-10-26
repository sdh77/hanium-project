var soldOutTags = document.querySelectorAll(
  ".soldOutarea .soldOutgrid .soldout"
);

function alterSoldOut(target) {
  let name = target.querySelector("p").innerText;
  let soldout = target.classList.item(1);
  if (soldout == "yes") {
    target.classList.remove("yes");
    console.log(target.className);
    sendSoldOut(name, 0);
    chromeTTS(name + "가 판매상태가 되었습니다.");
  } else {
    target.classList.add("yes");
    console.log(target.className);
    sendSoldOut(name, 1);
    chromeTTS(name + "가 품절 되었습니다.");
  }
}

soldOutTags.forEach((target) => {
  target.addEventListener("click", function () {
    alterSoldOut(target);
  });
});
