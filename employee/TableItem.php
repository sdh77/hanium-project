<?php
  $Date = $_GET["Date"];
  $cnt = 0;
  $cnt_food = 0;
  $cnt_drink = 0;
  $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

  for($tableID = 1; $tableID <=15; $tableID++){
    echo'<div class="table-info">
      <div class="table-info__row">
        <div class="table-info__number">'.$tableID.'</div>
        <div class="table-info__time">경과 시간</div>
      </div>';
    $sql = "SELECT orderdetail.name, menu.div
      FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name 
      WHERE DATE(orderdetail.date) = '".$Date."' and tableid = " .$tableID."and div in('샐러드','파스타','라이스','피자','스테이크','사이드')" ;
    $result = pg_query($conn, $sql);
    if ($result) {
      if (pg_num_rows($result) > 0) {
        $cnt = 0;
        while ($row = pg_fetch_assoc($result)) {
          if($cnt== 0){
            echo'<div class="table-info__info">
              <div class="table-info__column">
                <div class="table-info__food">음식</div>
                  <div class="table-info__food-info">'.$row["name"].'</div>';
            $cnt++;
          }
          else{
            echo'<div class="table-info__food-info">'.$row["name"].'</div>';
            $cnt++;
          }
        }
        echo'</div>';
      }
      else{
        echo'<div class="table-info__info">
        <div class="table-info__column">
          <div class="table-info__food">음식</div>
            <div class="table-info__food-info"></div></div>';
      }
    }
    $sql = "SELECT orderdetail.name, menu.div
      FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name 
      WHERE DATE(orderdetail.date) = '".$Date."' and tableid = " .$tableID."and div in('주류','와인','음료')" ;
    $result = pg_query($conn, $sql);
    if ($result) {
      $cnt = 0;
      if (pg_num_rows($result) > 0) {
        while ($row = pg_fetch_assoc($result)) {
          if($cnt == 0){
            echo'<div class="table-info__column">
              <div class="table-info__drink">주류</div>
              <div class="table-info__drink-info">'.$row["name"].'</div>';
            $cnt++;
          }
          else{
            echo'<div class="table-info__drink-info">'.$row["name"].'</div>';
            $cnt++;
          }
        }
        echo'</div>';
      }
      else{
        echo'<div class="table-info__info">
        <div class="table-info__column">
          <div class="table-info__drink">음식</div>
            <div class="table-info__drink-info"></div></div>';
      }
    }
    echo'</div>
      </div></div>';
  }
  pg_close($conn);
?>