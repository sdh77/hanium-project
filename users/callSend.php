<?php
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

$tableid = $_GET['tableid'];
$serviceText = $_GET['serviceText'];


$sql = "insert into call values('" . $serviceText . "', false ," . $tableid . ")";
echo $sql;

pg_query($conn, $sql);
pg_close($conn);

?>