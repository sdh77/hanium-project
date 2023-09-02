<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from orderdetail";
$result = pg_query($conn, $sql);

$oldtableId = 0;

echo '<div class="main-area">';

if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      if ($row["tableid"] != $oldtableId) {
        if ($oldtableId != 0)
          echo '</div>';
        echo '<div class="tableOrderItem">
          <div>' . $row["name"] . " : " . $row["quantity"] . '</div>';
        $oldtableId = $row["tableid"];
      } else {
        echo '<div>' . $row["name"] . " : " . $row["quantity"] . '</div>';
      }
    }
  }
}
echo '</div>';
?>