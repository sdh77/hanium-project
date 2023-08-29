let searchText;

function search() {
  searchText = document.querySelector(".searchArea div input").value;
  loadpageSearchList();
}

function loadpageSearchList() {
  let params = {
    newsearch: searchText,
  };
  $.ajax({ url: "showList.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".list").html(data);
  });
}
