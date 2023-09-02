const soldOutTags = document.querySelectorAll(".main-area .grid .soldout");

function alterSoldOut(target) {
  let name = target.querySelector("p").innerText;
  let soldout = target.classList.item(1);
  if (soldout == "yes") {
    target.classList.remove("yes");
    console.log(target.className);
    sendSoldOut(name, 0);
  } else {
    target.classList.add("yes");
    console.log(target.className);
    sendSoldOut(name, 1);
  }
}

soldOutTags.forEach((target) => {
  target.addEventListener("click", function () {
    alterSoldOut(target);
  });
});

function sendSoldOut(name, soldout) {
  let params = {
    Name: name,
    soldOut: soldout,
  };
  $.ajax({ url: "soldOutDo.php", type: "get", data: params });
}
