$.ajax({
  url: "list_div.php",
  type:"get"
}).done(function(data){
  $('#menupage').html(data);
});


function change_check(){
  var clicklists = document.querySelectorAll('.menu');
  clicklists.forEach(function(clicklist){
    clicklist.classList.remove('click');
  });
  event.currentTarget.classList.add('click');
}

function change_order(){
  var clicklists = document.querySelectorAll('.order');
  clicklists.forEach(function(clicklist){
    clicklist.classList.remove('click');
  });
  event.currentTarget.classList.add('click');
}
function clear_order(){
  var clicklists = document.querySelectorAll('.order');
  clicklists.forEach(function(clicklist){
    clicklist.classList.remove('click');
  });
}

//기능 구현

//페이지 전환
page = 0;
function uppage(){
  page++;
  loadpage();
}

function downpage(){
  if(page > 0){
    page--;
  }
  loadpage();
}

//목차 변경
type = "all";
function set_type(newtype){
  type = newtype;
  page = 0;
  loadpage();
}

//정렬기준 변경
order = "";
function set_order(neworder){
  if(order == neworder){
    order = "";
    clear_order();
  }
  else
    order = neworder;
  page = 0;
  loadpage();
}

//검색 기능
function mysearch(){
//  var searchtext = document.getElementsByClassName('searchtext').value;
  var searchtext = document.getElementById('searchtext').value;

  loadpage_search(searchtext);
}

function loadpage_search(search_text){
  const menupage = document.getElementById('menupage');
  menupage.src = 'list_div.php?search=' + search_text;
}

//링크 변경
function loadpage(){
  const menupage = document.getElementById('menupage');
  menupage.src = 'list_div.php?pagenum=' + page + '&type=' + type + '&order=' + order;
}

window.addEventListener('message', receiveDataFromChild, false);
function receiveDataFromChild(event) {
  if (event.origin !== 'null') {
    var data = event.data;  
    console.log('부모가 자식으로부터 받은 데이터:', data);
  }
}
