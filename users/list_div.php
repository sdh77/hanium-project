<?php
$totalnum;
$cnt = 0;
$pagenum = isset($_GET['newpage']) ? $_GET['newpage'] : 0;
$order_type = isset($_GET['neworder']) ? $_GET['neworder'] : "";
$search = isset($_GET['newsearch']) ? $_GET['newsearch'] : "";
$type = isset($_GET['newtype']) ? $_GET['newtype'] : "all";
$action = isset($_GET['action']) ? $_GET['action'] : "noAction";
$menubar = isset($_GET['menubar']) ? $_GET['menubar'] : "";
$recommend = isset($_GET['recommend']) ? $_GET['recommend'] : "";


$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
if ($action == "recommend") {
  $sql = "select * from menu where name in (" . $recommend . ") order by new desc, id";
} else if ($action == "menubar") {
  $sql = "select * from menu where div = '{$menubar}' order by new desc, id";
} else if ($action == "menubar") {
} else {
  if ($search != "")
    $sql = "select * from menu where trash = false and name like '%" . $search . "%' order by new desc, id";
  else if ($order_type == "추천") {
    $sql = "select * from menu where trash = false and recommend = true order by new desc, id";

    // if ($type == "술")
    //   $sql = "select * from menu where trash = false and div in ('주류','와인') order by recommend desc, new desc, id";
    // else if ($type == "all")
    //   $sql = "select * from menu where trash = false order by recommend desc, new desc, id";
    // else
    //   $sql = "select * from menu where trash = false and div ='" . $type . "' order by recommend desc, new desc, id";
  } else if ($order_type == "판매량") {
    if ($type == "술")
      $sql = "select * from menu where trash = false and div in ('주류','와인') order by cnt, new desc, id";
    else if ($type == "all")
      $sql = "select * from menu where trash = false order by cnt, new desc, id";
    else
      $sql = "select * from menu where trash = false and div ='" . $type . "' order by cnt, new desc, id";
  } else if ($order_type == "맵기") {
    if ($type == "술")
      $sql = "select * from menu where trash = false and div in ('주류','와인') order by spicy desc, new desc, id";
    else if ($type == "all")
      $sql = "select * from menu where trash = false order by spicy desc, new desc, id";
    else
      $sql = "select * from menu where trash = false and div ='" . $type . "' order by spicy desc, new desc, id";
  } else {
    if ($type == "술")
      $sql = "select * from menu where trash = false and div in ('주류','와인') order by new desc, id";
    else if ($type == "all")
      $sql = "select * from menu where trash = false order by new desc, id";
    else
      $sql = "select * from menu where trash = false and div ='" . $type . "' order by new desc, id";
  }
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

        echo '<div class="grid_item ';
        if ($row["soldout"] == "t")
          echo 'SoldOut';
        else
          echo 'noSoldOut';
        echo '"><img id="menu-img" src="../admin/image/이미지(jpg)/'
          . $row["name"] . '.jpg" alt="' . $row["name"] . '"></img>';
        if ($row["soldout"] == "t")
          echo '<div class="soldOutTag"><p class="soldOutLetter">Sold Out</p></div>';
        echo '<div class="spicyItem">';
        for ($i = 0; $i < (int) $row["spicy"]; $i++)
          echo '<i class="fa-solid fa-pepper-hot"></i>';
        echo '</div><div class="newRecItem">';
        if ($row["new"] == "t")
          echo '<div class="newItem">new</div>';
        if ($row["recommend"] == "t")
          echo '<div class="recItem">추천</div>';
        echo '</div>';
        if ((strlen($row["name"]) <= 16 * 2) && ($row['div'] != "와인")) {
          echo '<p class="menu">' . $row["name"] . '</p><br>';
        } else if ((strlen($row["name"]) <= 32 * 2) && ($row['div'] != "와인")) {
          echo '<p class="menu">' . $row["name"] . '</p>';
        } else if ((strlen($row["name"]) <= 16) && ($row['div'] == "와인")) {
          echo '<p class="menu">' . $row["name"] . '</p><br>';
        } else if ((strlen($row["name"]) <= 30) && ($row['div'] == "와인")) {
          echo '<p class="menu">' . $row["name"] . '</p>';
        } else {
          echo '<p class="menu" style="font-size:1vw">' . $row["name"] . '</p>';
        }
        echo '<p class="price">' . number_format($row["price"], 0, ',', ',') . '</p></div>';
        // 16
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

pg_close($conn);

?>
<script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>