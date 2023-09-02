function orderItem() {
  $.ajax({ url: "postItem.php", type: "get" }).done(function (data) {
    $(".bottom-area").html(data);
  });
}

orderItem();
