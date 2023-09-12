<?php
$soldout = $_GET['soldOut'];
$name = $_GET['Name'];
$sql = "";
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
if ($soldout == 1) {
  $sql = "update menu set soldout = true where name = '" . $name . "'";
} else if ($soldout == 0) {
  $sql = "update menu set soldout = false where name = '" . $name . "'";
}
$result = pg_query($conn, $sql);
pg_close($conn);
?>