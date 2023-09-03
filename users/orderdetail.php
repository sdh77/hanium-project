<?php
// orderlist 데이터베이스에 값을 넣는 기능
/*
$host = "www.ddhye.com";
$port = "5432";
$dbname = "mytableorder";
$user = "dodo";
$password = "net123";
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
  die("PostgreSQL 연결 실패");
}
 */
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

// 클라이언트로부터 받은 JSON 데이터를 디코딩
$order = json_decode(file_get_contents('php://input'), true);

// 각 아이템을 데이터베이스에 저장
if ($order['type'] === 'order') {
  foreach ($order['items'] as $item) {
    $query = pg_prepare($conn, "insert_query", 'INSERT INTO orderdetail (tableid, name, quantity) VALUES ($1, $2, $3)');
    $result = pg_execute($conn, "insert_query", array($order['tableid'], $item['name'], $item['quantity']));
  }
  echo 'Order saved successfully.';
} elseif ($order['type'] === 'service') {
  $query = pg_prepare($conn, "insert_service_query", 'INSERT INTO orderdetail (tableid, text) VALUES ($1, $2)');
  $result = pg_execute($conn, "insert_service_query", array($order['tableid'], $order['serviceText']));
  echo 'Service request saved successfully.';
}

?>
