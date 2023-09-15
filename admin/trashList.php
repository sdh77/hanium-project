<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from menu where trash = true";

$result = pg_query($conn, $sql);
echo'
<div class="popupHeader">휴지통</div>
<div class="popupRight">
  <button onclick="hide()">닫기</button>
</div>
<div class="scroll">
<div class="trashGrid">';

if ($result) {
  $totalnum = pg_num_rows($result);
  if ($totalnum > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '<div class="trash__div"><div><img id="trash-img" src="../admin/image/이미지(jpg)/'
      . $row["name"] . '.jpg" alt="' . $row["name"] . '"></img></div><div class="id">' 
      . $row["id"] . '</div> <button class="trash__menu"><div>' . $row["name"] . '</div></button></div>';
    }
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}
echo'</div></div>';
pg_close($conn);
?>