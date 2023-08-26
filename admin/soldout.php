<?php
  $soldout = $_GET['newsoldout'];
  $id = $_GET['newid'];
  $sql = "";
  $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: '.pg_last_error());
  if($soldout == "true")
    $sql = "update menu set soldout = true where id = $id";
  else if($soldout == "false")
    $sql = "update menu set soldout = false where id = $id";
  echo $sql;
  $result = pg_query($conn, "update_query",$sql);
if (!$result) {
    die("Query failed: " . pg_last_error());
}

?>
