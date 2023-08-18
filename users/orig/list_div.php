<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>menu select</title>

  <link rel="stylesheet" href ="list_div.css?ver7" />

</head>

<div class="grid">

<?php
  $cnt = 0;
  $pagenum = isset($_GET['newpage']) ? $_GET['newpage'] : 0;
  $order_type = isset($_GET['neworder']) ? $_GET['neworder'] : "";
  $search = isset($_GET['newsearch']) ? $_GET['newsearch'] : "";
  $type = isset($_GET['newtype']) ? $_GET['newtype'] : "all";

  $conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=food_admin password=aaa') or die('Could not connect: '.pg_last_error());


  if($search != "")
    $sql = "select * from menu where name like '%".$search."%' order by new desc, id";
  
  else if($order_type == "추천"){
    if($type == "술")
      $sql = "select * from menu where div in ('주류','와인') order by recommend desc, new desc, id";
    else if($type == "all")
      $sql = "select * from menu order by recommend desc, new desc, id";
    else
      $sql = "select * from menu where div ='" .$type. "' order by recommend desc, new desc, id";
  }
  else if($order_type == "판매량"){
    if($type == "술")
      $sql = "select * from menu where div in ('주류','와인') order by cnt, new desc, id";
    else if($type == "all")
      $sql = "select * from menu order by cnt, new desc, id";
    else
      $sql = "select * from menu where div ='" .$type. "' order by cnt, new desc, id";
  }

  else if($order_type == "맵기"){
    if($type == "술")
      $sql = "select * from menu where div in ('주류','와인') order by spicy desc, new desc, id";
    else if($type == "all")
      $sql = "select * from menu order by spicy desc, new desc, id";
    else
      $sql = "select * from menu where div ='" .$type. "' order by spicy desc, new desc, id";
  }

  else{
    if($type == "술")
      $sql = "select * from menu where div in ('주류','와인') order by new desc, id";
    else if($type == "all")
      $sql = "select * from menu order by new desc, id";
    else
      $sql = "select * from menu where div ='" .$type. "' order by new desc, id";
  }

  $result = pg_query($conn, $sql);
  if($result){
    $totalpage = pg_num_rows($result);
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

  echo'</div>';

  echo '<div class="pagebuttons"><button class="up" onclick="downpage();"><</button>';
  if($totalpage%9 == 0)
    $totalpage = $totalpage/9-1;
  else
    $totalpage = $totalpage/9;
  
  for($i = 0; $i<$totalpage;$i++){
    echo'<button class="pagebutton"';
    if($i == $pagenum)
      echo'id="thispage"';
    echo' onclick="changepage('.$i.')">-</button>';
  }
  echo '<button class="down" onclick="uppage();">></button></div>';


  echo'<script>
        window.onload = function(){
          window.parent.postMessage('.$cnt .', "*");
        }</script>';


?>
</html>

