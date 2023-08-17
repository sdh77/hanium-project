<?php
// DB 연결 정보 설정
$host = "www.ddhye.com"; // 호스트 주소 (또는 호스트 이름)
$port = "5432"; // 기본값은 5432입니다.
$dbname = "mytableorder";
$user = "dodo";
$password = "net123";

// PostgreSQL 연결
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("PostgreSQL 연결 실패");
}

// POST 방식으로 전달된 데이터 확인
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 입력 폼으로부터 받아온 데이터
    $menu = isset($_POST['menu']) ? pg_escape_string($conn, $_POST['menu']) : '';
    $price = isset($_POST['price']) ? intval($_POST['price']) : 0;
    $type = isset($_POST['type']) ? pg_escape_string($conn, $_POST['type']) : '';

    // 메뉴 추가 쿼리
    $sql = "INSERT INTO menulist (menu, price, type) VALUES ('$menu', $price, '$type')";
    $result = pg_query($conn, $sql);

    if (!$result) {
        die("메뉴 추가 실패");
    }
}

// 연결 종료
pg_close($conn);
?>
