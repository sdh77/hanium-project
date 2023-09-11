<?php
$Date = $_GET['Date'];
$Sort = $_GET['Sort'];
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$totalCnt = 0;
$totalPrice = 0;
echo $Date;
if($Sort == "cnt"){
  $sql = "SELECT orderdetail.name, COUNT(orderdetail.name) AS cnt, menu.price,
   menu.div FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name WHERE DATE(orderdetail.date) = '"
   .$Date."' GROUP BY orderdetail.name, menu.price, menu.div";
}
else{
  $sql = "SELECT orderdetail.name, COUNT(orderdetail.name) AS cnt, menu.price,
  menu.div FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name WHERE DATE(orderdetail.date) = '"
  .$Date."' GROUP BY orderdetail.name, menu.price, menu.div order by menu.div";
}
$result = pg_query($conn, $sql);

if ($result) {
  $totalnum = pg_num_rows($result);
  if ($totalnum > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '<div class="toDayOrder__data"><div class="toDayOrder__name">'.$row["name"].'</div><div class="toDayOrder__cnt">'.$row["cnt"].'개</div><div class="toDayOrder__price">'.number_format (($row["price"]*$row["cnt"]), 0, ',', ',').'원</div></div>';  
      $totalCnt += $row["cnt"];
      $totalPrice += ($row["cnt"] * $row["price"]);
    }
    echo '<div class="toDayOrder__data"><div class="toDayOrder__name">합계</div><div class="toDayOrder__cnt">'.$totalCnt.'개</div><div class="toDayOrder__price">'.number_format ($totalPrice, 0, ',', ',').'원</div></div>';;
  }
  else{
    echo "<br>주문 내역 없음!!!";
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}

pg_close($conn);
?>