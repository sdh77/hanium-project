<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>정렬중...</title>
  <link rel="stylesheet" href="arr_style.css" />
</head>

<body>
  <nav>
    <button>
      <a class="action_button" href="update.php">돌아가기</a>
    </button>
    <?php
    $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());

    $menu_div = $_POST["menu_div"];
    $sql = "SELECT * FROM menu where div ='" . $menu_div . "'";
    $result = pg_query($conn, $sql);

    echo "<table>";
    echo "<tr><th>번호</th><th>이름</th><th>가격</th><th>구분</th><th>추천</th><th>신제품</th><th>맵기</th><th>주문수</th><th>순서</th></tr>";
    if ($result) {
      if (pg_num_rows($result) > 0) {
        while ($row = pg_fetch_assoc($result)) {
          echo '<form action="update_sort.php" method="get" target="none">';
          echo "<tr><td><input name='id' value='" . $row["id"] . "' readonly></input></td><td>" . $row["name"] . "</td><td>" . $row["price"] . "</td><td>" . $row["div"] . "</td><td>";
          echo ($row["recommend"] === 't' ? '☆' : '');
          echo "</td><td>";
          echo ($row["new"] === 't' ? '✔️' : '');
          echo "</td><td>" . $row["spicy"] . "</td><td>" . $row["cnt"] . "</td>";
          echo '<td>
                <select id="numberSelect" onchange="this.form.submit()" name="sort">';
          for ($i = 1; $i <= pg_num_rows($result); $i++) {
            echo '<option value="' . $i . '"';
            if ($i == $row["index"])
              echo "selected";
            echo '>' . $i . '</option>';
          }
          echo '</select></td></tr>';
          echo '</form>';
        }
        //        echo "<tr><td colspan = '9'>  <button type='submit' name='apply'>적용</button>  </td></tr>";  
      } else {
        echo "<tr><td colspan = '9'>no item</td></tr>";
      }
      echo "<table>";
    } else {
      echo "오류 발생: " . pg_last_error($conn);
    }
    pg_close($conn);
    ?>
  </nav>

  <iframe style="width:0px; height: 0px; border:0px;" name="none"></iframe>

  <script>
  function change_sort(id) {}
  </script>

</body>

</html>