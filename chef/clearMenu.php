<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$orderId = isset($_GET['orderId']) ? $_GET['orderId'] : 0;
if ($orderId == 0) {
} else {
  $sql = "update orderdetail set clear = true where orderdetail_id = " . $orderId;
  echo $sql;
  $result = pg_query($conn, $sql);
}
pg_close($conn);

?>