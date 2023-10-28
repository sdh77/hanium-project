<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$number = $_GET['number'];

$sql = "update call set complete = true where table_id =". $number;
      //update db명 set 변경할 속성명 = 변경할 값 where 조건(속성명 = 값 and 속성명 = 값);

echo $sql;
pg_query($conn, $sql);
pg_close($conn);

?>