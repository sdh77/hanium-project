<?php
$totalnum;
$type = isset($_GET['newtype']) ? $_GET['newtype'] : "all";
$search = $_GET['newsearch'];
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
//  echo $pagenum. $type. $search;
if ($search != "")
  $sql = "select * from menu where name  like '%" . $search . "%' order by id";
else {
  if ($type == "술")
    $sql = "select * from menu where div in ('주류','와인') order by id";
  else if ($type == "all")
    $sql = "select * from menu order by id";
  else
    $sql = "select * from menu where div ='" . $type . "' order by id";
}
$result = pg_query($conn, $sql);

echo "<span class='headerdiv'><div>번호</div><div>이름</div><div>판매현황</div></span>";
if ($result) {
  $totalnum = pg_num_rows($result);
  if ($totalnum > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo "<span><div class='id'>" . $row["id"] . "</div><div><button class='update'><div>" . $row["name"];
      // echo"<img class='adminMenuImg' src='../admin/image/이미지(jpg)/". $row["name"] . ".jpg' alt='X'></img>";
      echo"</div></button></div><div class='btn'><button class='newSoldOut'>";
      if ($row["soldout"] == "t")
        echo "판매중지";
      else if ($row["soldout"] == "f")
        echo "판매중";
      echo "</button></div></span>";
    }
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}
pg_close($conn);
?>
<script src="JS/send_sold_out.js?ver3"></script>
<script src="JS/popup.js?ver2"></script>