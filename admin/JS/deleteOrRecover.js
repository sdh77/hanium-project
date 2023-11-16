function deleteAll() {
  let params = {
    state: "delete",
  };
  $.ajax({ url: "DeleteOrRecoverAll.php", type: "get", data: params });
  setTimeout(loadpageListDelete, 100);
  hide();
}
function recoverAll() {
  let params = {
    state: "recover",
  };
  $.ajax({ url: "DeleteOrRecoverAll.php", type: "get", data: params });
  setTimeout(loadpageListDelete, 100);
  hide();
}

trashes = document.querySelectorAll(".trash__menu");
console.log(trashes);
trashes.forEach(function (trash) {
  trash.addEventListener("click", function () {
    DeleteOrRecover(trash);
  });

  console.dir(trash.onclick);
});

var checkState = 0;

function selectAll() {
  console.log(checkState);

  const trashChecks = document.querySelectorAll(".trash__check");
  if (checkState == 0) {
    trashChecks.forEach(function (trashCheck) {
      trashCheck.checked = true;
    });
    checkState = 1;
  } else {
    trashChecks.forEach(function (trashCheck) {
      trashCheck.checked = false;
    });
    checkState = 0;
  }
  console.log(checkState);
}
function recoverSelect() {
  const trashChecks = document.querySelectorAll(".trash__check");
  trashChecks.forEach(function (trashCheck) {
    if (trashCheck.checked == true) {
      let params = {
        Id: trashCheck.id,
        state: "recover",
      };
      $.ajax({ url: "DeleteOrRecoverSelect.php", type: "get", data: params });
    }
  });
  setTimeout(loadpageListDelete, 100);
  hide();
}
function deleteSelect() {
  const trashChecks = document.querySelectorAll(".trash__check");
  trashChecks.forEach(function (trashCheck) {
    if (trashCheck.checked == true) {
      let params = {
        Id: trashCheck.id,
        state: "delete",
      };
      $.ajax({ url: "DeleteOrRecoverSelect.php", type: "get", data: params });
    }
  });
  setTimeout(loadpageListDelete, 100);
  hide();
}

function loadpageListDelete() {
  let params = {
    newtype: "all",
    newsearch: "",
  };
  $.ajax({ url: "showList.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".list").html(data);
  });
}
