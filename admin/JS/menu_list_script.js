let type = "all";
let searchNone = "";
function setType(newtype){
  type = newtype;
  loadpageList();
}

window.onload = loadpageList();

//로드 페이지
function loadpageList(){
  let params = {
    newtype: type,
    newsearch: searchNone,
  }
  $.ajax({
    url: "showList.php",
    type:"get",
    data: params,
  }).done(function(data){
    $('.list').html(data);
  });
}

