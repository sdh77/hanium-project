<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from orderdetail";
$result = pg_query($conn, $sql);

$oldtableId = 0;
$orderTime = 0;

echo '<div class="main-area">';

if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      if ($row["tableid"] != $oldtableId) {
        if ($oldtableId != 0)
          echo '</div>';
        echo '<div class="tableOrderItem">';
        if ($row["tableid"] != $oldtableId) {
          echo '<p class="orderTableId">' . $row["tableid"] . '</p>
            <p class="tableOrderItem__time ' . substr($row["date"], 11, 8) . '">0 분</p>';
        }
        echo '<p class="tableOrderItem__menu">' . $row["name"] . " : " . $row["quantity"] . '</p>';
        $oldtableId = $row["tableid"];
      } else {
        echo '<p class="tableOrderItem__menu">' . $row["name"] . " : " . $row["quantity"] . '</p>';
      }
    }
  }
}
echo '</div>';
?>
<script src="JS/timer.js"></script>
<script src="JS/finishMenu.js"></script>