<?php
date_default_timezone_set('Asia/Seoul');
$Date = $_GET['Date'];
$firstDay = substr($Date, 0, 8) . "01";
$week = ["일", "월", "화", "수", "목", "금", "토"];
$firstDayWeek = date('w', strtotime($firstDay));
$day_count = date('t', strtotime($firstDay));
$cnt = 0;
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

echo '
<div class="calendar">
<div class="calendar_grid">
    <div class="calendar_grid__day Month">
    <button class="moveLeft"><</button>
    <div class="yearMonth">' . substr($Date, 0, 4) . '년 ' . substr($Date, 5, 2) . '월
    <button class="resetCalendar" onclick="resetCalendar()">🥕</button>
    </div>
    <button class="moveRight">></button></div>';
for ($i = 0; $i < 7; $i++)
  echo '<div class="calendar_grid__week"><p>' . $week[$i] . '</p></div>';
for ($i = 0; $i < $firstDayWeek; $i++)
  echo '<div class="calendar_grid__day hide"></div>';

for ($days = 1; $days <= $day_count; $days++) {
  $sql = "SELECT orderdetail.name, COUNT(orderdetail.name) AS cnt, menu.price
    FROM orderdetail INNER JOIN menu ON orderdetail.name = menu.name WHERE DATE(orderdetail.date) = '" . substr($Date, 0, 8) . $days . "' 
    GROUP BY orderdetail.name, menu.price";
  $result = pg_query($conn, $sql);
  $totalPrice = 0;
  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      while ($row = pg_fetch_assoc($result)) {
        $totalPrice += ($row["cnt"] * $row["price"]);
      }
    } else {
    }
  } else {
    echo "오류 발생: " . pg_last_error($conn);
  }

  $cnt++;
  echo '<button class="showList"><div class="calendar_grid__day"><div class="calendar_grid__day__num';
  if ((substr($Date, 0, 8) . sprintf('%02d', $days)) == $Date)
    echo ' today';
  echo '"><p>' . $cnt . '</p></div>
    <div class="calendar_grid__day__price">' . $totalPrice . '</div>
    </div></button>';
}
echo '
  </div>
</div>
';
pg_close($conn);

?>
<script src="JS/moveMonth.js"></script>
<script src="JS/showEachList.js"></script>