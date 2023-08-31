<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>리스트 출력</title>
  <link rel="stylesheet" href="list_style.css?ver2" />
</head>

<body>
  <nav>
    <div class="toparea">
      <button class="left">
        <a class="action_button" href="index.html">돌아가기</a>
      </button>
      <p class="title">관리자 모드</p>
      <button class="right">
        <a class="action_button" href="update.php">리스트 수정</a>
      </button>
    </div>

    <?php
    $totalnum;
    $pagenum = isset($_GET['pagenum']) ? $_GET['pagenum'] : 0;
    echo $pagenum;
    $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());

    echo "<table>";
    echo "<tr><th>번호</th><th>이름</th><th>가격</th><th>구분</th><th>추천</th><th>신제품</th><th>맵기</th><th>주문수</th></tr>";
    $sql = "select * from menu order by id";
    $result = pg_query($conn, $sql);
    if ($result) {
      $totalnum = pg_num_rows($result);
      if ($totalnum > 0) {
        $cnt = 0;
        while ($row = pg_fetch_assoc($result)) {
          if ($cnt >= $pagenum * 25 && $cnt < 25 * ($pagenum + 1)) {
            echo "<tr><td>" . $row["id"] . "</td><td>" . $row["name"] . "</td><td>" . $row["price"] . "</td><td>" . $row["div"] . "</td><td>";
            echo ($row["recommend"] === 't' ? '☆' : '');
            echo "</td><td>";
            echo ($row["new"] === 't' ? '✔️' : '');
            echo "</td><td>" . $row["spicy"] . "</td><td>" . $row["cnt"] . "</td></tr>";
          }
          $cnt++;
        }
      } else {
        echo "<tr><td colspan = '4'>no item</td></tr>";
      }
      echo "<table>";
    } else {
      echo "오류 발생: " . pg_last_error($conn);
    }
    pg_close($conn);
    ?>

    </script>
</body>

</html>
