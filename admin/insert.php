<?php
echo '
    <div class="left">
      <button onclick="hide()">닫기</button>
    </div>
    <div class="header">메뉴 추가</div>
    <div class="popupmain" id="insertPopup">
    <div class="popupcenter">
    <div><p>이름</p><input class="nameInput"></input></div>
    <div><p>가격</p><input class="priceInput"></input></div>
    <div><p>구분</p><select class="divselect" name="menu_div">
      <option value="파스타">파스타</option>
      <option value="샐러드">샐러드</option>
      <option value="피자">피자</option>
      <option value="스테이크">스테이크</option>
      <option value="라이스">라이스</option>
      <option value="사이드">사이드</option>
      <option value="음료">음료</option>
      <option value="와인">와인</option>
      <option value="주류">주류</option>
    </select></div>
    <div><p>추천</p>';
echo '<input id="recoCheck" type="checkbox"><label for="recoCheck"></label></div>';
echo '<div><p>new</p>';
echo '<input id="newCheck" type="checkbox" checked><label for="newCheck"></label>
    </div>
    <div> 
      <p>맵기</p>
      <div>
      <a class="spicy thisSpicy" onclick="change_spicy()">0</a></div>
      <div><a class="spicy" onclick="change_spicy()" >1</a></div>
      <div><a class="spicy" onclick="change_spicy()" >2</a></div>
    </div>
    </div>
    <div class="popupimg">
    <div><input type="file" name="fileToUpload" id="fileToUpload"></div>
  </div>  
    <div class="popupbottom">
      <div><a onclick="sendInsert()">추가</button></div>
    </div>';
?>