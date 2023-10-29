<?php
$today = $_GET['today'];
$action = $_GET['action'];
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$id = 1;
$oldtableId = 0;
$orderTime = 0;
$oldtablecomplete = "f";
echo '<div class="main-area">';
if ($action == "notClear") {
  $sql = "select * from orderdetail left join menu on orderdetail.name = menu.name 
  where div in('파스타','라이스','샐러드','피자','스테이크','사이드') and tablecomplete = false order by tablecomplete desc, orderdetail_id";
  // where div in('파스타','라이스','샐러드','피자','스테이크','사이드') and tablecomplete = false and DATE(date) = '" . $today . "' order by orderdetail_id";  


  $result = pg_query($conn, $sql);
  if ($result) {
    if (pg_num_rows($result) > 0) {
      while ($row = pg_fetch_assoc($result)) {

        if ($row["tableid"] != $oldtableId) {

          if ($oldtableId != 0)
            echo '</div></div>';

          echo '<div class="tableOrderItem">';
          if ($row["tableid"] != $oldtableId) {
            echo '<p class="orderTableId">' . $row["tableid"] . '번 테이블</p>
            <p class="tableOrderItem__time ' . substr($row["date"], 11, 8) . '">0 분</p>
            <div class="orderdetail_scroll">';
            $id = 1;

          }
          echo '<div class="orderdetail_list  ' . $row["orderdetail_id"];
          if ($row["clear"] == "t")
            echo ' clear';
          echo '"><p class="tableOrderItem__menu">' . $id . ".</p><div class='orderdetail_name'>" . $row["name"] . "</div><p> : " . $row["quantity"] . '</p></div>
        <hr>';
          $oldtableId = $row["tableid"];
          $id++;
        } else {
          echo '<div class="orderdetail_list  ' . $row["orderdetail_id"];
          if ($row["clear"] == "t")
            echo ' clear ';
          echo '"><p class="tableOrderItem__menu">' . $id . ".</p><div class='orderdetail_name'>" . $row["name"] . "</div><p> : " . $row["quantity"] . '</p></div>
        <hr>';
          $id++;
        }

      }
    }
  }
} else if ($action == "clear") {
  $sql = "select * from orderdetail left join menu on orderdetail.name = menu.name 
where div in('파스타','라이스','샐러드','피자','스테이크','사이드') and tablecomplete = true order by tablecomplete desc, orderdetail_id";
  // where div in('파스타','라이스','샐러드','피자','스테이크','사이드') and tablecomplete = true and DATE(date) = '" . $today . "' order by orderdetail_id";

  $result = pg_query($conn, $sql);
  if ($result) {
    if (pg_num_rows($result) > 0) {
      while ($row = pg_fetch_assoc($result)) {

        if ($row["tableid"] != $oldtableId) {

          if ($oldtableId != 0)
            echo '</div></div>';

          echo '<div class="tableOrderItemCLEAR">';
          if ($row["tableid"] != $oldtableId) {
            echo '<p class="orderTableId">' . $row["tableid"] . '번 테이블</p>
            <p class="tableOrderItem__time ' . substr($row["date"], 11, 8) . '">조리 완료</p>
            <div class="orderdetail_scroll">';

            $id = 1;
          }
          echo '<div class="orderdetail_list  ' . $row["orderdetail_id"];
          if ($row["clear"] == "t")
            echo ' clear';
          echo '"><p class="tableOrderItem__menu">' . $id . ".</p><div class='orderdetail_name'>" . $row["name"] . "</div><p> : " . $row["quantity"] . '</p></div>
        <hr>';
          $oldtableId = $row["tableid"];
          $id++;
        } else {
          echo '<div class="orderdetail_list  ' . $row["orderdetail_id"];
          if ($row["clear"] == "t")
            echo ' clear ';
          echo '"><p class="tableOrderItem__menu">' . $id . ".</p><div class='orderdetail_name'>" . $row["name"] . "</div><p> : " . $row["quantity"] . '</p></div>
        <hr>';
          $id++;
        }

      }
    }
  }
}
echo '</div></div>';
pg_close($conn);

?>

<script src="JS/timer.js"></script>
<script src="JS/finishMenu.js"></script>