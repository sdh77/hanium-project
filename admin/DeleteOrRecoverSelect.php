<?php
$Id = $_GET['Id'];
$state = $_GET['state'];

$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
if ($state == "delete") {
  $selectNameSql = "select name from menu where id = " . $Id;
  $result = pg_query($conn, $selectNameSql);
  if ($result) {
    $totalnum = pg_num_rows($result);
    if ($totalnum > 0) {
      while ($row = pg_fetch_assoc($result)) {
        unlink("../admin/image/이미지(jpg)/" . $row["name"] . ".jpg");
      }
    }
  }
  $sql = "delete from menu where id = " . $Id;

} else {
  $sql = "update menu set trash = false where id = " . $Id;
}

echo $sql;
pg_query($conn, $sql);
pg_close($conn);

?>