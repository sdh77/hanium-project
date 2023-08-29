<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());
$id = $_GET['newid'];
$sql = "select * from menu where id =" . $id;
$result = pg_query($conn, $sql);
$row = pg_fetch_assoc($result);

echo '
    <div class="left">
      <button onclick="hide()">닫기</button>
    </div>
    <div class="header">세부 수정</div>
    <div class="popupmain" id="updatePopup">
    <div><p>이름</p><input class="nameInput" placeholder="' . $row["name"] . '"></input></div>
    <div><p>가격</p><input class="priceInput" placeholder="' . $row["price"] . '"></input></div>
    <div><p>구분</p><select class="divselect" name="menu_div">
      <option value="파스타" ' . ($row["div"] == "파스타" ? "selected" : "") . '>파스타</option>
      <option value="샐러드" ' . ($row["div"] == "샐러드" ? "selected" : "") . '>샐러드</option>
      <option value="피자" ' . ($row["div"] == "피자" ? "selected" : "") . '>피자</option>
      <option value="스테이크" ' . ($row["div"] == "스테이크" ? "selected" : "") . '>스테이크</option>
      <option value="라이스" ' . ($row["div"] == "라이스" ? "selected" : "") . '>라이스</option>
      <option value="사이드" ' . ($row["div"] == "사이드" ? "selected" : "") . '>사이드</option>
      <option value="음료" ' . ($row["div"] == "음료" ? "selected" : "") . '>음료</option>
      <option value="와인" ' . ($row["div"] == "와인" ? "selected" : "") . '>와인</option>
      <option value="주류" ' . ($row["div"] == "주류" ? "selected" : "") . '>주류</option>
    </select></div>
    <div><p>추천</p>';


if ($row["recommend"] == "t")
  echo '<input id="recoCheck" type="checkbox" checked><label for="recoCheck"></label></div>';
else
  echo '<input id="recoCheck" type="checkbox"><label for="recoCheck"></label></div>';
echo '<div><p>new</p>';
if ($row["new"] == "t")
  echo '<input id="newCheck" type="checkbox" checked><label for="newCheck"></label>';
else
  echo '<input id="newCheck" type="checkbox"><label for="newCheck"></label>';
echo '
    </div>

    <div> 
      <p>맵기</p>
      <div>
      <a class="spicy ';
if ($row["spicy"] == 0)
  echo 'thisSpicy';
echo '" onclick="change_spicy()">0</a></div>
      <div><a class="spicy ';
if ($row["spicy"] == 1)
  echo 'thisSpicy';
echo '" onclick="change_spicy()" >1</a></div>
      <div><a class="spicy ';
if ($row["spicy"] == 2)
  echo 'thisSpicy';
echo '" onclick="change_spicy()" >2</a></div>
    </div>
    <div class="popupbottom">
      <div>삭제</div>
      <div><a onclick="thisUpdate(' . $id . ')">수정</button></div>
    </div>
  </div>';
pg_close($conn);
?>