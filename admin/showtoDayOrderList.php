<?php
$Date = isset($_GET['Date']) ? $_GET['Date'] : "";
$Action = isset($_GET['action']) ? $_GET['action'] : "";

$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$totalCnt = 0;
$totalPrice = 0;

if ($Date != "") {
  echo '<p class="salesTodayHeader">' . $Date . '</p>';
  $sql = "SELECT orderdetail.name, COUNT(orderdetail.name) AS cnt, menu.price,
   menu.div FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name WHERE DATE(orderdetail.date) = '"
    . $Date . "' GROUP BY orderdetail.name, menu.price, menu.div  order by count(menu.div) desc";

  $result = pg_query($conn, $sql);
  echo '<button onclick="hide()">닫기</button>';



  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      while ($row = pg_fetch_assoc($result)) {
        $totalCnt += $row["cnt"];
        echo '<div class="toDayOrder__data"><div class="toDayOrder__name">' . $row["name"] . '</div><div class="toDayOrder__cnt">' . $row["cnt"] . '개</div><div class="toDayOrder__price">' . number_format(($row["price"] * $row["cnt"]), 0, ',', ',') . '원</div></div>';
        $totalPrice += ($row["cnt"] * $row["price"]);
      }
      echo '<div class="toDayOrder__data toDayOrder__total"><div class="toDayOrder__name">합계</div><div class="toDayOrder__cnt">' . $totalCnt . '개</div><div class="toDayOrder__price">' . number_format($totalPrice, 0, ',', ',') . '원</div></div>';
      ;
    } else {
      echo "<br>주문 내역 없음!!!";
    }
  } else {
    echo "오류 발생: " . pg_last_error($conn);
  }
}

if ($Action == "일 매출") {
  $sql = "SELECT extract (year from date) as year , extract (month from date) as month, sum(price * quantity) as sumprice
  from orderdetail left join menu on orderdetail.name = menu.name 
  group by extract (year from date), extract (month from date)";

  $result = pg_query($conn, $sql);
  echo '<p class="salesTodayHeader"> 년도 </p>';
  echo '<button onclick="hide()">닫기</button>';



  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      while ($row = pg_fetch_assoc($result)) {
        echo '<div>' . $row["month"] . '</div>
        <div>' . $row["sumprice"] . '</div>';
      }

    } else {
      echo "<br>주문 내역 없음!!!";
    }
  } else {
    echo "오류 발생: " . pg_last_error($conn);
  }
} else if ($Action == "월 매출") {
  $sql = "SELECT extract (year from date) as year , extract (month from date) as month, sum(price * quantity) as sumprice
  from orderdetail left join menu on orderdetail.name = menu.name 
  group by extract (year from date), extract (month from date)";

  $result = pg_query($conn, $sql);
  echo '<p class="salesTodayHeader"> 년도 </p>';
  echo '<button onclick="hide()">닫기</button>';



  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      while ($row = pg_fetch_assoc($result)) {
        echo '<div>' . $row["month"] . '</div>
        <div>' . $row["sumprice"] . '</div>';
      }

    } else {
      echo "<br>주문 내역 없음!!!";
    }
  } else {
    echo "오류 발생: " . pg_last_error($conn);
  }
} else if ($Action == "년 매출") {
  $sql = "SELECT extract (year from date) as year , sum(price * quantity) as sumprice
  from orderdetail left join menu on orderdetail.name = menu.name 
  group by extract (year from date)";

  $result = pg_query($conn, $sql);
  echo '<p class="salesTodayHeader"> 년 매출 </p>';
  echo '<button onclick="hide()">닫기</button>';



  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      echo '<div class="totalSaleGrid">';

      while ($row = pg_fetch_assoc($result)) {
        echo '<div><div>' . $row["year"] . '</div>
        <div>' . $row["sumprice"] . '</div></div>';
      }
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';
      echo '<div style="background-color: red;">a</div>';

      echo '</div>';

    } else {
      echo "<br>주문 내역 없음!!!";
    }
  } else {
    echo "오류 발생: " . pg_last_error($conn);
  }
}

pg_close($conn);
?>