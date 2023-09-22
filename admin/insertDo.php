<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$name = $_GET['newName'];
$price = $_GET['newPrice'];
$div = $_GET['newDiv'];
$reco = $_GET['newRecommend'];
$new = $_GET['newMenu'];
$spicy = $_GET['newSpicy'];


$sql = "insert into menu(name, price, div, recommend, spicy, new) values('" . $name . "', " . $price . ", '" . $div . "', " . $reco . ",  " . $spicy . ", " . $new . ")";
echo $sql;

pg_query($conn, $sql);
pg_close($conn);

?>