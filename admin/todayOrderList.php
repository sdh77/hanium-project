<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from orderdetail";

$result = pg_query($conn, $sql);

if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '<div>' . $row["tableid"] . '</div><div>' . $row["name"] . '</div><div>'
        . $row["quantity"] . '</div><hr>';
    }
  }
}
pg_close($conn);

?>