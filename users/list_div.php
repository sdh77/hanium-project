<?php
$totalnum;
$cnt = 0;
$pagenum = isset($_GET['newpage']) ? $_GET['newpage'] : 0;
$order_type = isset($_GET['neworder']) ? $_GET['neworder'] : "";
$search = isset($_GET['newsearch']) ? $_GET['newsearch'] : "";
$type = isset($_GET['newtype']) ? $_GET['newtype'] : "all";

//$conn = pg_connect('host=localhost port=5432 dbname=mytableorder user=dodo password=net123') or die('Could not connect: '.pg_last_error());
$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());

if ($search != "")
  $sql = "select * from menu where name like '%" . $search . "%' order by new desc, id";
else if ($order_type == "추천") {
  if ($type == "술")
    $sql = "select * from menu where div in ('주류','와인') order by recommend desc, new desc, id";
  else if ($type == "all")
    $sql = "select * from menu order by recommend desc, new desc, id";
  else
    $sql = "select * from menu where div ='" . $type . "' order by recommend desc, new desc, id";
} else if ($order_type == "판매량") {
  if ($type == "술")
    $sql = "select * from menu where div in ('주류','와인') order by cnt, new desc, id";
  else if ($type == "all")
    $sql = "select * from menu order by cnt, new desc, id";
  else
    $sql = "select * from menu where div ='" . $type . "' order by cnt, new desc, id";
} else if ($order_type == "맵기") {
  if ($type == "술")
    $sql = "select * from menu where div in ('주류','와인') order by spicy desc, new desc, id";
  else if ($type == "all")
    $sql = "select * from menu order by spicy desc, new desc, id";
  else
    $sql = "select * from menu where div ='" . $type . "' order by spicy desc, new desc, id";
} else {
  if ($type == "술")
    $sql = "select * from menu where div in ('주류','와인') order by new desc, id";
  else if ($type == "all")
    $sql = "select * from menu order by new desc, id";
  else
    $sql = "select * from menu where div ='" . $type . "' order by new desc, id";
}

$result = pg_query($conn, $sql);
if ($result) {
  $totalpage = pg_num_rows($result);

  echo '<div class="gridmain"><a ';
  if ($pagenum != 0) {
    echo 'onclick="downpage();"';
  }
  echo '> <div class="leftimg"></div></a>';

  echo '<div class="grid">';

  if (pg_num_rows($result) > 0) {
    $viewcnt = 0; //화면에 출력된 매뉴의 개수
    while ($row = pg_fetch_assoc($result)) {
      $cnt++;
      if (($cnt > (6 * $pagenum)) && ($cnt <= (6 * ($pagenum + 1)))) {
        //echo'<div class="grid_item"><img id="menu-img" src="/img/' . $row["index"] .'.jpg" alt="'.$row["index"].'"></img>'. '<p class="menu">' . $row["name"].'</p>'.'<br>' . '<p class="price">'.$row["price"] .'</p></div>';

        echo '<div class="grid_item"><img id="menu-img" src="../admin/image/이미지(jpg)/'
         . $row["name"] . '.jpg" alt="' . $row["name"] . '"></img><div class="spicy">';
        for($i = 0; $i< (int)$row["spicy"];$i++)
          echo'<i class="fa-solid fa-pepper-hot"></i>';
        echo'</div><p class="menu">' . $row["name"] .'</p>' . '<br>' . '<p class="price">' . $row["price"] . '</p></div>';


        $viewcnt++;
      }
    }
    for (; $viewcnt < 6; $viewcnt++) {
      echo '<div class="grid_item_none"></div>';
    }

  } else {
    echo '<p class="grid_item_error"> no item </p>';
  }
}
echo '</div>';


$totalpage = $totalpage / 6;
echo ' <a ';
if ($pagenum < $totalpage - 1)
  echo 'onclick="uppage();"';
echo '><div class="rightimg"></div></a></div>';


echo '<div class="pagebuttons">';
for ($i = 0; $i < $totalpage; $i++) {
  echo '<button class="pagebutton"';
  if ($i == $pagenum)
    echo 'id="thispage"';
  echo ' onclick="changepage(' . $i . ')">●</button>';
}
echo '<script>
    window.onload = function(){
      window.parent.postMessage(' . $cnt . ', "*");
    }</script>';
?>
<script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>