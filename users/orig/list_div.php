<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>menu select</title>

  <link rel="stylesheet" href ="list_div.css?ver5" />

</head>
<div class="grid">

<?php
  $cnt = 0;
  $pagenum = 1;
  $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: '.pg_last_error());
  $sql = 'select * from menu';
  $result = pg_query($conn, $sql);
  if($result){
    if(pg_num_rows($result)>0){
      $viewcnt = 0;//화면에 출력된 매뉴의 개수
      while($row = pg_fetch_assoc($result)){
        $cnt++;
        if(($cnt > (9 * $pagenum)) && ($cnt <= (9 *($pagenum +1)))){
          echo'<div class="grid_item"><img src="/ilprimo/img/'.$row["name"] .'.jpg" alt="'.$row["name"].'"></img>'. $row["name"].'<br>'.$row["price"] . '</div>';
          $viewcnt++;
        }
      }
      for(;$viewcnt<9;$viewcnt++){
        echo'<div class="grid_item"></div>';
      }
        
    }
    else{
      echo '<div class="grid_item error"> no item </div>';
    }
  }

  echo'<script>
        window.onload = function(){
          window.parent.postMessage('.$cnt .', "*");
        }</script>';

echo'</div>';

?>
</html>

