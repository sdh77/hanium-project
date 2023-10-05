function deleteAll() {
  let params = {
    state: "delete",
  };
  $.ajax({ url: "DeleteOrRecoverAll.php", type: "get", data: params });
  hide();
  loadpageList();
}
function recoverAll() {
  let params = {
    state: "recover",
  };
  $.ajax({ url: "DeleteOrRecoverAll.php", type: "get", data: params });
  hide();
  loadpageList();
}

function DeleteOrRecover(trash) {
  let trashId = trash.querySelector(".id").innerHTML;
  console.log(trash);
  if (confirm("삭제하려면 'yes'아니면 'cancel'을 누르세요") == true) {
    let params = {
      Id: trashId,
      state: "delete",
    };
    $.ajax({ url: "DeleteOrRecoverSelect.php", type: "get", data: params });
    hide();
  } else {
    let params = {
      Id: trashId,
      state: "recover",
    };
    $.ajax({ url: "DeleteOrRecoverSelect.php", type: "get", data: params });
    hide();
  }
  loadpageList();
}
trashes = document.querySelectorAll(".trash__menu");
console.log(trashes);
trashes.forEach(function (trash) {
  trash.addEventListener("click", function () {
    DeleteOrRecover(trash);
  });

  console.dir(trash.onclick);
});
