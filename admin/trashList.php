<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from menu where trash = true";

$result = pg_query($conn, $sql);
echo '
<div class="popupHeader">휴지통</div>
<div class="popupRight">
  <button onclick="hide()">X</button>
</div>
<div class="selectMenu">
<button onclick="recoverAll()">모두 복구</button>
<button onclick="deleteAll()">모두 삭제</button>
<button onclick="selectAll()">모두 선택</button>
<button onclick="recoverSelect()">선택 복구</button>
<button onclick="deleteSelect()">선택 삭제</button>
</div>
<div class="scroll">
<div class="trashGrid">';

if ($result) {
  $totalnum = pg_num_rows($result);
  if ($totalnum > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '<div class="trash__div">
      <input id="' . $row["id"] . '" class="trash__check" type="checkbox"><label for="' . $row["id"] . '"></label>
      <div class="id">'
        . $row["id"] . '</div>
        <div class="trash__name"><p>' . $row["name"] . '</p></div>
        </div>';
    }
  }
} else {
  echo "오류 발생: " . pg_last_error($conn);
}
echo '</div></div>';
pg_close($conn);
?>

<script src="JS/deleteOrRecover.js"></script>