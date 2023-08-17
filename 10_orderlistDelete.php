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

$sql = "DELETE FROM orderlist";

$result = pg_query($conn, $sql);

if($result){
    echo "Records were delete successfully.";
} else {
    echo "ERROR: Could not able to execute $sql. " . pg_last_error($conn);
}

pg_close($conn);
?>
