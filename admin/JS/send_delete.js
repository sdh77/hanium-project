function thisDelete(id) {
  if (confirm("정말로 삭제하시겠습니까?") == true) {
    let params = {
      newid: id,
    };
    $.ajax({ url: "gotoTrash.php", type: "get", data: params });
    // alert("삭제 완료");
    hide();
    loadpageList();
  }
}
