<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>매출 화면</title>
  <link rel="stylesheet" href="index_style.css?ver3" />
</head>

<body>
  <?php
    $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin pas    sword=aaa') or die('Could not connect: ' . pg_last_error());
    $sql = "select * from menu";
  ?>
</body>
</html>
