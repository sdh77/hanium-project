const messageBox = document.querySelector(".background .window .deleteMessage");

function thisDelete(id) {
  if (confirm("정말로 삭제하시겠습니까?") == true) {
    let params = {
      newid: id,
    };
    $.ajax({ url: "gotoTrash.php", type: "get", data: params });
    messageBox.classList.remove("hide");
    // popup.classList.add("show");
    setTimeout(function () {
      messageBox.classList.add("hide");
      hide();
    }, 2000);

    loadpageList();
  }
}
