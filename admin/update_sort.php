<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());
$id = $_GET["id"];
$new_sort = $_GET["sort"];

//  echo $id,$new_sort;
$sql = "update menu set index = $new_sort where id = $id";
$result = pg_query($conn, $sql);
if (!$result)
  echo "오류";

?>