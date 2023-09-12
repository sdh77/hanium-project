<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from menu where div in('주류','와인','음료') order by div, id";
$result = pg_query($conn, $sql);

echo'<div class="soldOutarea">';
if ($result) {
  if (pg_num_rows($result) > 0) {
    echo '<div class="soldOutgrid">';
    while ($row = pg_fetch_assoc($result)) {
      echo '<a class="soldout';
      if ($row["soldout"] == "t") {
        echo ' yes';
      }
      echo '"><div class="ItemList"><img id="menu-img" src="../admin/image/이미지(jpg)/'
        . $row["name"] . '.jpg" alt="' . $row["name"] . '"></img><p>' . $row["name"] . '</p></div></a>';
    }
    echo '</div>';
  }
}
echo'</div>';
?>
<script src="JS/sendSoldOut.js?ver1"></script>