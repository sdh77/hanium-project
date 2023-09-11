<?php
$Date = $_GET['Date'];
$Sort = $_GET['Sort'];
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

echo $Date;
if($Sort == ""){
  $sql = "select name, count(name)as cnt from orderdetail where DATE(date) = '".$Date."' group by name";
}
else{
  $sql = "select name, count(name)as cnt from orderdetail where DATE(date) = '".$Date."' group by name order by " .$Sort;
}
$result = pg_query($conn, $sql);

if ($result) {
  $totalnum = pg_num_rows($result);
  if ($totalnum > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '<div class="toDayOrder__data"><div class="toDayOrder__name">'.$row["name"].'</div><div class="toDayOrder__cnt">'.$row["cnt"].'개</div></div>';  
    }
  }
  else{
    echo "<br>주문 내역 없음!!!";
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}
pg_close($conn);
?>