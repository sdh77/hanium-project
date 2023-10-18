<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$call = $_GET['call'];
$tableNumber = $_GET['tableNumber'];
echo $call;
echo $tableNumber;
if($call == "fa-circle")
$realcall = "앞접시";
else if($call == "fa-spoon")
$realcall = "숟가락";
else if($call == "fa-glass-water")
$realcall = "물";
else if($call == "fa-equals")
$realcall = "젓가락";
else if($call == "fa-shirt")
$realcall = "앞치마";
else if($call == "fa-bell")
$realcall = "직원 호출";
else if($call == "fa-box-tissue")
$realcall = "물티슈";
else if($call == "fa-toilet-paper")
$realcall = "휴지";
$sql = "update call set complete = true where name ='". $realcall."' and table_id =". $tableNumber;
      //update db명 set 변경할 속성명 = 변경할 값 where 조건(속성명 = 값 and 속성명 = 값);
echo $sql;
pg_query($conn, $sql);
pg_close($conn);

?>