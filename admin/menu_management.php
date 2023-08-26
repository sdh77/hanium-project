<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>메뉴관리 화면</title>
  <link rel="stylesheet" href="CSS/management_style.css?ver4" />
</head>

<body>
  <div class="searchArea">
    <div><input></input></div>
    <button onclick="search();">검색</button>
  </div>

  <div class="listselect">
    <a onclick="setType('all'); change_check();">전체메뉴</a>
    <a onclick="setType('샐러드'); change_check();">샐러드</a>
    <a onclick="setType('파스타'); change_check();">파스타</a>
    <a onclick="setType('라이스'); change_check();">라이스</a>
    <a onclick="setType('피자'); change_check();">피자</a>
    <a onclick="setType('스테이크'); change_check();">스테이크</a>
    <a onclick="setType('음료'); change_check();">음료</a>
    <a onclick="setType('술'); change_check();">와인 및 주류</a>
  </div>

  <div class="list">
  </div>

  <iframe name="none"></iframe>
  <iframe style="width:0px; height: 0px; border:0px;" name="none"></iframe>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="JS/menu_list_script.js?ver1"></script>
  <script src="JS/menu_search.js?ver1"></script>
  <script src="JS/send_sold_out.js?ver1"></script>
  <script src="JS/div_select.js?ver1"></script>

</body>
</html>
