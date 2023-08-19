$(document).ready(function() {
  $.ajax({
    url: "list_div.php",
    type:"get"
  }).done(function(data){
    $('#menupage').html(data);
  });
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
  loadpage_list();
}

function downpage(){
  if(page > 0){
    page--;
  }
  loadpage_list();
}

//목차 변경
type = "all";
function set_type(newtype){
  type = newtype;
  page = 0;
  loadpage_list();
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
  loadpage_list();
}

//버튼으로 인한 페이지 변경
function changepage(num){
  page = num;
  loadpage_list();
}

//검색 기능
function mysearch(){
  var search_text = document.getElementById('searchtext').value;
  var params = {
    newsearch: search_text,
  }
  $.ajax({
    url: "list_div.php",
    type:"get",
    data: params,
  }).done(function(data){
    $('#menupage').html(data);
  });
}

//로드 페이지
function loadpage_list(){
  var params = {
    newpage: page,
    newtype: type,
    neworder: order,
  }
  $.ajax({
    url: "list_div.php",
    type:"get",
    data: params,
  }).done(function(data){
    $('#menupage').html(data);
  });
}


