<?php
// orderlist 데이터베이스에 값을 넣는 기능
    $host = "www.ddhye.com";
    $port = "5432";
    $dbname = "mytableorder";
    $user = "dodo";
    $password = "net123";

    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

    if(!$conn) {
        die("PostgreSQL 연결 실패");
    }

    // 클라이언트로부터 받은 JSON 데이터를 디코딩
    $order = json_decode(file_get_contents('php://input'), true);

    // 각 아이템을 데이터베이스에 저장
    foreach ($order['items'] as $item) {
        $query = pg_prepare($conn, "insert_query", 'INSERT INTO orderlist (orderid, menu, quantity) VALUES ($1, $2, $3)');
        $result = pg_execute($conn, "insert_query", array($order['orderID'], $item['menu'], $item['quantity']));
    }

    // 성공 메시지를 출력합니다.
    echo 'Order saved successfully.';
?>

