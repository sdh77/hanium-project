<?php
// DB 연결 정보 설정

// PostgreSQL 연결
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: '.pg_last_error());
if(!$conn) {
    die("PostgreSQL 연결 실패");
}

// 테이블 선택
$table = isset($_GET['table']) ? pg_escape_string($conn, $_GET['table']): 'menulist';

// 메뉴 타입 선택
$type = isset($_GET['type']) ? pg_escape_string($conn, $_GET['type']): '';

// 모든 메뉴 또는 특정 메뉴 타입에 해당하는 메뉴 가져오는 쿼리
if($type === 'AdminMode'){
    $sql = "SELECT id, menu, price, type FROM $table ORDER BY id";
} else {
    if($type !== ''){
        $sql = "SELECT menu, price, img_url FROM $table WHERE type = '$type' ORDER BY id";
    } else {
        $sql = " SELECT menu, price, img_url FROM $table ORDER BY id";
    }
}

$result = pg_query($conn, $sql);

if(!$result) {
    die("쿼리 실행 실패");
}

// 테이블 생성 및 데이터 출력
if($type === 'AdminMode'){
    echo '<table class="admin-table">';
    echo '<tr><th style="border: 1px solid #111; padding: 8px;">ID</th><th style="border: 1px solid #111; padding: 8px;">Menu</th><th style="border: 1px solid #111; padding: 8px;">Price</th><th style="border: 1px solid #111; padding: 8px;">Type</th></tr>';

    while ($row = pg_fetch_assoc($result)) {
	echo '<tr>';
        echo '<td style="border: 1px solid #111; padding: 8px;">' . $row["id"] . '</td>';
        echo '<td style="border: 1px solid #111; padding: 8px;">' . $row["menu"] . '</td>';
        echo '<td style="border: 1px solid #111; padding: 8px;">' . $row["price"] . '</td>';
        echo '<td style="border: 1px solid #111; padding: 8px;">' . $row["type"] . '</td>';
        echo '</tr>';
    }
    echo '</table>';
} else {
    echo '<div class="menu-container">';
    while ($row = pg_fetch_assoc($result)) {
    	echo '<div class="menu-item">';
      	echo '<img src="' . $row["img_url"] . '" class="img">';
      	echo '<p class="menu">' . $row["menu"] . '</p>';
        echo '<p class="price">' . $row["price"] . '</p>';
        echo '</div>';
    }
    echo '</div>';
}

// 연결 종료
pg_close($conn);
?>

