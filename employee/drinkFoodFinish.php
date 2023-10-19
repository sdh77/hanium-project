<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$Name = $_GET['Name'];
$Table = $_GET['Table'];
echo $Name;
echo $Table;

$sql = "update orderdetail set completed = true where name ='". $Name."' and tableid =". $Table;
      //update db명 set 변경할 속성명 = 변경할 값 where 조건(속성명 = 값 and 속성명 = 값);
echo $sql;
pg_query($conn, $sql);
pg_close($conn);

?>