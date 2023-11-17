function sendInsert() {
  const popUp = document.getElementById("insertPopup");

  const name = popUp.querySelector("div .nameInput");
  const price = popUp.querySelector("div .priceInput");
  const div = popUp.querySelector("div .divselect");
  const recommend = popUp.querySelector("div #recoCheck");
  const selectNew = popUp.querySelector("div #newCheck");
  const spicy = popUp.querySelector("div .thisSpicy").innerText;

  let newName = name.value;

  let newPrice = price.value;

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
      newName: newName,
      newPrice: newPrice,
      newDiv: newDiv,
      newRecommend: newRecommend,
      newMenu: newMenu,
      newSpicy: spicy,
    };
    $.ajax({ url: "insertDo.php", type: "get", data: params });
    inputImg(newName);
    alert("추가 완료");
    setTimeout(loadpageList, 100);
    hide();
  }
}

function inputImg(newName) {
  let formData = new FormData();
  formData.append("newName", newName);
  formData.append("newImg", $("#fileToUpload")[0].files[0]);

  $.ajax({
    url: "newimgUpload.php",
    type: "post",
    dataType: "html",
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    data: formData,
    async: false,
    cache: false,
    timeout: 600000,
    error: function () {
      alert("실패");
    },
  });
}
