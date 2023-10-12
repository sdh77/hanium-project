<?php
$quantity = isset($_GET["quantity"]) ? $_GET["quantity"] : 1;

$names = isset($_GET["names"]) ? $_GET["names"] : "none";
$quantitys = isset($_GET["quantitys"]) ? $_GET["quantitys"] : "none";

if ($names != "none") {
  for ($i = 0; $i < count($names); $i++) {
    echo '<div class="shopcartAll_popup__list__item">
    <div>' . $names[$i] . '</div><div>' . $quantitys[$i] . '개</div>
    </div>';
  }
}
?>