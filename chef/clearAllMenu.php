<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$orderList = $_GET['orderList'];

$sql = "update orderdetail set clear = true where orderdetail_id in " . $orderList;
echo $sql;
$result = pg_query($conn, $sql);
pg_close($conn);

?>