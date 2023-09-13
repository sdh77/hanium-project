<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$id = $_GET['newid'];
$name = $_GET['newName'];
$price = $_GET['newPrice'];
$div = $_GET['newDiv'];
$reco = $_GET['newRecommend'];
$new = $_GET['newMenu'];
$spicy = $_GET['newSpicy'];

$sql = "select name from menu where id =".$id;
$result = pg_query($conn, $sql);
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      rename('../admin/image/이미지(jpg)/'.$row["name"] . '.jpg' ,'../admin/image/이미지(jpg)/'.$name . '.jpg');
    }
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}


$sql = "update menu set name = '" . $name . "', price = " . $price .
  ", div = '" . $div . "', recommend = " . $reco . ", new = " . $new .
  ", spicy=" . $spicy . " where id =" . $id;

echo $sql;
pg_query($conn, $sql);
pg_close($conn);


?>