<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>정렬중...</title>
  <link rel="stylesheet" href="arr_style.css?ver1" />
</head>
<body>
  <nav>
    <button><a class="action_button" href="update.php">돌아가기</a></button>
  <?php
    $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: '.pg_last_error());

    $menu_div = $_POST["menu_div"];

if (isset($_POST['apply'])) {
    $menu_id = $_POST["menu_id"];
    $new_index = $_POST["new_index"];
    $menu_div = $_POST["menu_div"];
    echo "asd";
    if ($menu_div !== 'none') {
        // 해당 메뉴 종류($menu_div)에 해당하는 모든 메뉴의 인덱스를 변경하는 쿼리
        $sql2 = "UPDATE menu SET index = $new_index WHERE id = '$menu_id'";
        $result = pg_query($conn, $sql2);

        if ($result) {
//            echo "<script>alert('메뉴 정보가 성공적으로 변경되었습니다.');</script>";
        } else {
            echo "오류 발생: " . pg_last_error($conn) . "<br>";
        }
    } else {
        echo "<script>alert('메뉴 종류를 선택해주세요.');</script>";
    }
}
$sql = "SELECT * FROM menu where div ='". $menu_div. "'";
$result = pg_query($conn, $sql);

    echo "<table>";
    echo "<tr><th>번호</th><th>이름</th><th>가격</th><th>구분</th><th>추천</th><th>신제품</th><th>맵기</th><th>주문수</th><th>순서</th></tr>";
    if($result){
      if(pg_num_rows($result)>0){
        while($row = pg_fetch_assoc($result)){
          echo "<tr><td>". $row["id"]. "</td><td>". $row["name"]. "</td><td>". $row["price"]. "</td><td>". $row["div"]. "</td><td>";
          echo ($row["recommend"] === 't' ? '☆':'');
          echo "</td><td>";
          echo ($row["new"] === 't' ? '✔️':'');
          echo"</td><td>". $row["spicy"]. "</td><td>". $row["cnt"] . "</td>";
          echo '<td>
                <select id="numberSelect" style="height: 30px;">';
                  for($i = 1; $i<= pg_num_rows($result); $i++){
                    echo'<option value="'.$i.'">'.$i.'</option>';
                  }
          echo'</select></td></tr>';
        }
	echo "<tr><td colspan = '9'>  <button type='submit' name='apply'>적용</button>  </td></tr>";  
      }
    else{
      echo "<tr><td colspan = '9'>no item</td></tr>";
    }
    echo "<table>";
  }
  else{
    echo "오류 발생: " . pg_last_error($conn);
  }
  pg_close($conn);
  ?>
</nav>


</body>
</html>
