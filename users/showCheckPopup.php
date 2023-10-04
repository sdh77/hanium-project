<?php
$name = $_GET["menu"];
$quantity = isset($_GET["quantity"]) ? $_GET["quantity"] : 1;


$conn = pg_connect('host=localhost port=5432 dbname=ilprimo user=hanium_kioski password=aaa') or die('Could not connect: ' . pg_last_error());
$sql = "select * from menu where name ='" . $name . "'";
$result = pg_query($conn, $sql);
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      echo '
      <div class="shoppingCart-popup-1">
      <button class="shoppingCart-popup-closeBtn">x</button>
    </div>
    <div class="shoppingCart-popup-2">
      <img class="shoppingCart-popup-img" src="../admin/image/이미지(jpg)/'
        . $row["name"] . '.jpg" alt="Menu Image">
    </div>
    <div class="shoppingCart-popup-3">
      <p class="shoppingCart-popup-informMenuDB">' . $name . '</p>
      <p class="shoppingCart-popup-informQuantity">' . $quantity . '</p>
      <p class="shoppingCart-popup-informText">개 주문하시겠습니까?</p>
    </div>
    <div class="shoppingCart-popup-4">
      <p class="shoppingCart-popup-quantityText">수량 </p>
      <p class="shoppingCart-popup-quantityInt">1</p>
      <button class="shoppingCart-popup-quantityIncrease">+</button>
      <button class="shoppingCart-popup-quantityDecrease">-</button>
      <button class="shoppingCart-popup-okBtn">장바구니</button>
    </div>';
      // echo'<div class="popupPrice">' . $row["price"] . '</div>';

    }
  }
}
?>

<script src="JS/menu_script.js?ver2"></script>