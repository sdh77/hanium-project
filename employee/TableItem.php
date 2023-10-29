<?php
$Date = $_GET["Date"];
$cnt = 0;
$cnt_food = 0;
$cnt_drink = 0;
$time = 0;
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());


for ($tableID = 1; $tableID <= 15; $tableID++) {
  $time = 0;
  echo '<div class="table-info">
      <div class="table-info__row">
        <div class="table-info__number">' . $tableID . '</div>';
  $newCall = "select * from call where table_id = " . $tableID . "and complete = false";
  $result = pg_query($conn, $newCall);
  echo '<div class="table-info__callList">';
  if ($result) {
    if (pg_num_rows($result) > 0) {
      while ($row = pg_fetch_assoc($result)) {
        $call = trim($row["name"]);
        if ($call == "숟가락")
          echo '<i class="fa-solid fa-spoon"></i>';
        else if ($call == "물")
          echo '<i class="fa-solid fa-glass-water"></i>';
        else if ($call == "젓가락")
          echo '<i class="fa-solid fa-equals" style="transform: rotate(-45deg)"></i>';
        else if ($call == "앞접시")
          echo '<i class="fa-solid fa-circle"></i>';
        else if ($call == "앞치마")
          echo '<i class="fa-solid fa-shirt"></i>';
        else if ($call == "직원 호출")
          echo '<i class="fa-regular fa-bell"></i>';
        else if ($call == "물티슈")
          echo '<i class="fa-solid fa-box-tissue"></i>';
        else if ($call == "휴지")
          echo '<i class="fa-solid fa-toilet-paper"></i>';

      }
    }
  }
  echo '</div>';


  echo '<div class="table-info__time">경과 시간</div>
      </div>';
  $sql = "SELECT orderdetail.name, menu.div, orderdetail.date, completed, orderdetail_id
      FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name 
      WHERE tableid = " . $tableID . "and div in('샐러드','파스타','라이스','피자','스테이크','사이드') and exit = false
      order by orderdetail_id";
  // WHERE DATE(orderdetail.date) = '" . $Date . "' and tableid = " . $tableID . "and div in('샐러드','파스타','라이스','피자','스테이크','사이드') and exit = false";
  $result = pg_query($conn, $sql);
  $count = 0;

  if ($result) {
    if (pg_num_rows($result) > 0) {
      $cnt = 0;
      while ($row = pg_fetch_assoc($result)) {
        if ($cnt == 0) {
          $cnt++;
          $count++;

          echo '<div class="table-info__info">
          <div class="table-info__column">
          <div class="table-info__food">음식</div>
          <div class="table-info__list">
          <div class="table-info__row select-row  ' . $row['orderdetail_id'];
          if ($row['completed'] == 't')
            echo ' Finish-line';
          echo '">              <!--여기가 번호 출력하는 부분이야!!!!!!!!!-->
          <div class="table-info__food-num foodDrinkNum">' . $count . '</div>
          <div class="table-info__food-info foodDrinkName">' . $row["name"] . '</div></div>';
          $time = (int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2);
        } else {
          $cnt++;
          $count++;
          echo '<div class="table-info__row select-row ' . $row['orderdetail_id'];
          if ($row['completed'] == 't')
            echo ' Finish-line';
          echo '">
          <div class="table-info__food-num foodDrinkNum">' . $count . '</div>
          <div class="table-info__food-info foodDrinkName">' . $row["name"] . '</div></div>';
          ($time < ((int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2))) ? $time : (int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2);
        }
      }
      echo '</div></div>';
    } else {
      echo '<div class="table-info__info">                  <!--여기가 번호 출력하는 부분이야!!!!!!!!!-->
        <div class="table-info__column">
          <div class="table-info__food">음식</div>
            <div class="table-info__food-info"></div></div>';
    }
  }
  $sql = "SELECT orderdetail.name, menu.div, orderdetail.date, completed, orderdetail_id
      FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name 
      WHERE tableid = " . $tableID . "and div in('주류','와인','음료') and exit = false
      order by orderdetail_id";
  // WHERE DATE(orderdetail.date) = '" . $Date . "' and tableid = " . $tableID . "and div in('주류','와인','음료') and exit = false";
  $result = pg_query($conn, $sql);
  if ($result) {
    $cnt = 0;
    if (pg_num_rows($result) > 0) {
      while ($row = pg_fetch_assoc($result)) {
        if ($cnt == 0) {
          $cnt++;
          $count++;
          echo '<div class="table-info__column">
            <div class="table-info__drink">주류</div>
          <div class="table-info__list">
          <div class="table-info__row select-row ' . $row['orderdetail_id'];
          if ($row['completed'] == 't')
            echo ' Finish-line';
          echo '">                    <!--여기가 번호 출력하는 부분이야!!!!!!!!!-->
              <div class="table-info__drink-num foodDrinkNum">' . $count . '</div>
              <div class="table-info__drink-info foodDrinkName">' . $row["name"] . '</div></div>';
          ($time < ((int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2))) ? $time : (int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2);
        } else {
          $cnt++;
          $count++;
          echo '<div class="table-info__row select-row  ' . $row['orderdetail_id'];
          if ($row['completed'] == 't')
            echo ' Finish-line';
          echo '">                <!--여기가 번호 출력하는 부분이야!!!!!!!!!-->
          <div class="table-info__drink-num foodDrinkNum">' . $count . '</div>
          <div class="table-info__drink-info foodDrinkName">' . $row["name"] . '</div>
          </div>';
          ($time < ((int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2))) ? $time : (int) substr($row["date"], 11, 2) * 3600 + (int) substr($row["date"], 14, 2) * 60 + (int) substr($row["date"], 17, 2);
        }
      }
      echo '</div></div>';
    } else {
      echo '<div class="table-info__column">
          <div class="table-info__drink">주류</div>
            <div class="table-info__drink-info"></div></div>';
    }
  }
  echo '</div>
      <div class="table-info__orderTime">' . $time . '</div>
      </div></div>';
}
pg_close($conn);
?>

<script src="JS/changeTime.js"></script>
<script src="JS/callFinish.js"></script>
<script src="JS/chatBot.js"></script>

<script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>