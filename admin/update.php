<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>데이터 수정</title>
    <link rel="stylesheet" href="update_style.css?ver6" />
</head>

<body>
    <div class="totalArea">
        <div class="topArea">
            <a class="action_button" href="index.html"><button>돌아가기</button></a>
            <p class="title">관리자 모드</p>
            <a class="action_button" href="list.php"><button>리스트 확인</button></a>
        </div>
      <div class="mainArea">
        <div class="middleArea">
            <a class="action_button" href="list.php"><button>리스트확인</button></a>
            <div class="selectArea">
            <form action="arr.php" method="post" style=" display: flex;     align-items: center;">
                <select name="menu_div">
                    <option value="파스타" ' . ($row["div"] == "파스타" ? "selected" : "") . '>파스타</option>
                    <option value="샐러드" ' . ($row["div"] == "샐러드" ? "selected" : "") . '>샐러드</option>
                    <option value="피자" ' . ($row["div"] == "피자" ? "selected" : "") . '>피자</option>
                    <option value="스테이크" ' . ($row["div"] == "스테이크" ? "selected" : "") . '>스테이크</option>
                    <option value="라이스" ' . ($row["div"] == "라이스" ? "selected" : "") . '>라이스</option>
                    <option value="사이드" ' . ($row["div"] == "사이드" ? "selected" : "") . '>사이드</option>
                    <option value="음료" ' . ($row["div"] == "음료" ? "selected" : "") . '>음료</option>
                    <option value="와인" ' . ($row["div"] == "와인" ? "selected" : "") . '>와인</option>
                    <option value="주류" ' . ($row["div"] == "주류" ? "selected" : "") . '>주류</option>
                </select>
                </div>
                <a class="action_button"><button>배치하기</button></a>
            </form>
        </div>
        <?php
        $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: ' . pg_last_error());

        if (isset($_POST['update'])) {
            $menu_id = $_POST["menu_id"];
            $new_name = $_POST["new_name"];
            $new_price = $_POST["new_price"];
            $new_div = $_POST["new_div"];
            $new_rec = isset($_POST["new_rec"]) ? 'true' : 'false'; // 체크박스가 체크되었을 때 "true", 그렇지 않을 때 "false" 값을 설정
            $new_new = isset($_POST["new_new"]) ? 'true' : 'false'; // 체크박스가 체크되었을 때 "true", 그렇지 않을 때 "false" 값을 설정
            $new_spicy = $_POST["new_spicy"];

            $update_query = "UPDATE menu SET name = '$new_name', price = $new_price, div = '$new_div', recommend = $new_rec, spicy = $new_spicy, new = $new_new WHERE id = $menu_id";
            $result = pg_query($conn, $update_query);

            if ($result) {
                echo "<script>alert('메뉴 정보가 성공적으로 변경되었습니다.');</script>";
            } else {
                echo "오류 발생: " . pg_last_error($conn) . "<br>";
            }
        }
        if (isset($_POST['add'])) {
            $new_name = $_POST["new_name"];
            $new_price = $_POST["new_price"];
            $new_div = $_POST["new_div"];
            $new_rec = isset($_POST["new_rec"]) ? 'true' : 'false'; // 체크박스가 체크되었을 때 "true", 그렇지 않을 때 "false" 값을 설정
            $new_new = isset($_POST["new_new"]) ? 'true' : 'false'; // 체크박스가 체크되었을 때 "true", 그렇지 않을 때 "false" 값을 설정
            $new_spicy = $_POST["new_spicy"];

            $sql = "insert into menu(name, price,div,recommend,spicy,new) values('" . $new_name . "'," . $new_price . ",'" . $new_div . "'," . $new_rec . "," . $new_spicy . "," . $new_new . ")";
            $result = pg_query($conn, $sql);
            if ($result) {
                echo "<script>alert('성공');</script><br>";
            } else {
                echo "오류 발생: " . pg_last_error($conn) . "<br>";
            }
        }
        if (isset($_POST['delete'])) {
            $menu_id = $_POST["menu_id"];

            $delete_query = "delete  from menu WHERE id = " . $menu_id;
            $result = pg_query($conn, $delete_query);

            if ($result) {
                echo "<script>alert('삭제 되었습니다.');</script>";
            } else {
                echo "오류 발생: " . pg_last_error($conn) . "<br>";
            }
        }
        echo "<table>";
        echo "<tr><th>번호</th><th>이름</th><th>가격</th><th>구분</th><th>추천</th><th>신제품</th><th>맵기</th><th>주문수</th><th></th></tr>";
        $sql = "SELECT * FROM menu order by id";
        $result = pg_query($conn, $sql);
        if ($result) {
            if (pg_num_rows($result) > 0) {
                while ($row = pg_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo '<form method="post" action="">';
                    echo '<input type="hidden" name="menu_id" value="' . $row["id"] . '">';
                    echo '<td><input id="name" type="text" name="new_name" value="' . $row["name"] . '"></td>';
                    echo '<td><input id="price" type="text" name="new_price" value="' . $row["price"] . '"></td>';
                    echo '<td>';
                    echo '<select name="new_div">';
                    echo '<option value="none" ' . ($row["div"] == "none" ? "selected" : "") . '>none</option>';
                    echo '<option value="파스타" ' . ($row["div"] == "파스타" ? "selected" : "") . '>파스타</option>';
                    echo '<option value="샐러드" ' . ($row["div"] == "샐러드" ? "selected" : "") . '>샐러드</option>';
                    echo '<option value="피자" ' . ($row["div"] == "피자" ? "selected" : "") . '>피자</option>';
                    echo '<option value="스테이크" ' . ($row["div"] == "스테이크" ? "selected" : "") . '>스테이크</option>';
                    echo '<option value="라이스" ' . ($row["div"] == "라이스" ? "selected" : "") . '>라이스</option>';
                    echo '<option value="사이드" ' . ($row["div"] == "사이드" ? "selected" : "") . '>사이드</option>';
                    echo '<option value="음료" ' . ($row["div"] == "음료" ? "selected" : "") . '>음료</option>';
                    echo '<option value="와인" ' . ($row["div"] == "와인" ? "selected" : "") . '>와인</option>';
                    echo '<option value="주류" ' . ($row["div"] == "주류" ? "selected" : "") . '>주류</option>';
                    echo '</select>';
                    echo '</td>';
                    echo '<td><input type="checkbox" id="recomd" name="new_rec" ' . ($row["recommend"] == 't' ? 'checked' : '') . ' onchange="updateRecommend(this)"></td>';
                    echo '<td><input type="checkbox" id="new" name="new_new" ' . ($row["new"] == 't' ? 'checked' : '') . ' onchange="updateRecommend(this)"></td>';
                    echo '<td style ="width: 70px;"><input id="spicy" style="width: 70px; text-align: center; " type="text" name="new_spicy" value="' . $row["spicy"] . '"></td>';
                    echo '<td>' . $row["cnt"] . '</td>';

                    echo "<td><div class='gridbutton'>";
                    echo '<button class="leftButton" type="submit" name="update">변경</button>';
                    echo '<button type="submit" name="delete">삭제</button>';
                    echo '</form>';
                    echo "</div></td>";
                    echo "</tr>";
                }
                echo "<tr>";
                echo "<td></td>";
                echo '<form method="post" action="">';
                echo '<input type="hidden" name="menu_id">';
                echo '<td><input id="name" type="text" name="new_name" /*autofocus*/></td>';
                echo '<td><input id="price" type="text" name="new_price"></td>';
                echo '<td>';
                echo '<select name="new_div">';
                echo '<option value="none" ' . ($row["div"] == "none" ? "selected" : "") . '>none</option>';
                echo '<option value="파스타" ' . ($row["div"] == "파스타" ? "selected" : "") . '>파스타</option>';
                echo '<option value="샐러드" ' . ($row["div"] == "샐러드" ? "selected" : "") . '>샐러드</option>';
                echo '<option value="피자" ' . ($row["div"] == "피자" ? "selected" : "") . '>피자</option>';
                echo '<option value="스테이크" ' . ($row["div"] == "스테이크" ? "selected" : "") . '>스테이크</option>';
                echo '<option value="라이스" ' . ($row["div"] == "라이스" ? "selected" : "") . '>라이스</option>';
                echo '<option value="사이드" ' . ($row["div"] == "사이드" ? "selected" : "") . '>사이드</option>';
                echo '<option value="음료" ' . ($row["div"] == "음료" ? "selected" : "") . '>음료</option>';
                echo '<option value="와인" ' . ($row["div"] == "와인" ? "selected" : "") . '>와인</option>';
                echo '<option value="주류" ' . ($row["div"] == "주류" ? "selected" : "") . '>주류</option>';
                echo '</select>';
                echo '</td>';
                echo '<td><input type="checkbox" id="recomd" name="new_rec" value="true" onchange="updateRecommend(this)"></td>';
                echo '<td><input type="checkbox" id="new" name="new_new" value="true" onchange="updateRecommend(this)"></td>';
                echo '<td style ="width: 70px;"><input id="spicy" style="width: 70px; text-align: center; " type="text" name="new_spicy" value = 0></td>';
                echo '<td>0</td>';
                echo "<td>";
                echo '<button type="submit" name="add" style="width:100%">추가</button>';
                echo '</form>';
                echo "</td>";
                echo "</tr>";
            } else {
                echo "<tr>";
                echo "<td></td>";
                echo '<form method="post" action="">';
                echo '<input type="hidden" name="menu_id">';
                echo '<td><input id="name" type="text" name="new_name" autofocus></td>';
                echo '<td><input id="price" type="text" name="new_price"></td>';
                echo '<td>';
                echo '<select name="new_div">';
                echo '<option value="none" ' . ($row["div"] == "none" ? "selected" : "") . '>none</option>';
                echo '<option value="파스타" ' . ($row["div"] == "파스타" ? "selected" : "") . '>파스타</option>';
                echo '<option value="샐러드" ' . ($row["div"] == "샐러드" ? "selected" : "") . '>샐러드</option>';
                echo '<option value="피자" ' . ($row["div"] == "피자" ? "selected" : "") . '>피자</option>';
                echo '<option value="스테이크" ' . ($row["div"] == "스테이크" ? "selected" : "") . '>스테이크</option>';
                echo '<option value="라이스" ' . ($row["div"] == "라이스" ? "selected" : "") . '>라이스</option>';
                echo '<option value="사이드" ' . ($row["div"] == "사이드" ? "selected" : "") . '>사이드</option>';
                echo '<option value="음료" ' . ($row["div"] == "음료" ? "selected" : "") . '>음료</option>';
                echo '<option value="와인" ' . ($row["div"] == "와인" ? "selected" : "") . '>와인</option>';
                echo '<option value="주류" ' . ($row["div"] == "주류" ? "selected" : "") . '>주류</option>';
                echo '</select>';
                echo '</td>';
                echo '<td><input type="checkbox" id="recomd" name="new_rec"  onchange="updateRecommend(this)"></td>';
                echo '<td><input type="checkbox" id="new" name="new_new"  onchange="updateRecommend(this)"></td>';
                echo "<td>";
                echo '<button type="submit" name="add" style="width:100%">추가</button>';
                echo '</form>';
                echo "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "오류 발생: " . pg_last_error($conn);
        }

        pg_close($conn);
        ?>
    </div>
    </div>

    <script>
        function updateRecommend(checkbox) {
            // 체크박스가 체크된 경우 value를 'true'로 설정
            // 체크가 해제된 경우 value를 'false'로 설정
            checkbox.value = checkbox.checked ? 'true' : 'false';
        }

    </script>

</body>

</html>
