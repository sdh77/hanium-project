/*
const spicys = document.querySelectorAll(
  ".show .window .popup .popupmain div div .spicy"
);
*/

function change_spicy() {
  const spicys = document.getElementsByClassName("spicy");
  console.log(spicys);
  spicys.forEach(function (spicy) {
    spicy.classList.remove("thisSpicy");
  });
  event.currentTarget.classList.add("thisSpicy");
}

function thisUpdate(id) {
  const popUp = document.getElementById("updatePopup");

  const name = popUp.querySelector("div .nameInput");
  const price = popUp.querySelector("div .priceInput");
  const div = popUp.querySelector("div .divselect");
  const recommend = popUp.querySelector("div #recoCheck");
  const selectNew = popUp.querySelector("div #newCheck");
  const spicy = popUp.querySelector("div .thisSpicy").innerText;

  let newName;
  if (!name.value) newName = name.placeholder;
  else newName = name.value;

  let newPrice;
  if (!price.value) newPrice = price.placeholder;
  else newPrice = price.value;

  let newDiv = div.options[div.selectedIndex].value;

  let newRecommend;
  if (recommend.checked) newRecommend = "true";
  else newRecommend = "false";

  let newMenu;
  if (selectNew.checked) newMenu = "true";
  else newMenu = "false";

  if (isNaN(price.value)) alert("가격에 숫자만 입력하세요!!!!!");
  else {
    let params = {
      newid: id,
      newName: newName,
      newPrice: newPrice,
      newDiv: newDiv,
      newRecommend: newRecommend,
      newMenu: newMenu,
      newSpicy: spicy,
    };
    $.ajax({ url: "updateDo.php", type: "get", data: params });
    alert("수정 완료");
    hide();
  }
}
