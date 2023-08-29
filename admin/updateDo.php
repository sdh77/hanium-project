<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());

$id = $_GET['newid'];
$name = $_GET['newName'];
$price = $_GET['newPrice'];
$div = $_GET['newDiv'];
$reco = $_GET['newRecommend'];
$new = $_GET['newMenu'];
$spicy = $_GET['newSpicy'];


$sql = "update menu set name = '" . $name . "', price = " . $price .
  ", div = '" . $div . "', recommend = " . $reco . ", new = " . $new .
  ", spicy=" . $spicy . " where id =" . $id;

echo $sql;

pg_query($conn, $sql);

?>