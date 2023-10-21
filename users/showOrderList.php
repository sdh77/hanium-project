<?php
$tableId = $_GET['tableID'];
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

// echo $tableId;
$sql = "select name, quantity, date from orderdetail where exit = false and tableid = " . $tableId;
$result = pg_query($conn, $sql);
echo "<div class='orderListScroll'>";
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo "<div class='orderList_popup__list__item'>
        <div class='orderList_Date'>" . substr($row['date'], 0, 19) . "</div>
        <div class='orderList_Data'><div>" . $row['name'] . "</div><div>" . $row['quantity'] . "개</div></div>
      </div>";
      // echo $row['name'] . $row['quantity'] . $row['date'];
    }
  }
}
echo "</div>";
pg_close($conn);

?>