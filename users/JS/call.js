const calls = document.querySelectorAll(".servText");

calls.forEach(function (call) {
  call.addEventListener("click", function () {
    callSend(call);
  });
});

function callSend(call) {
  let name = call.innerHTML;
  let params = {
    Name: name,
  };
  $.ajax({ url: "callSend.php", type: "get", data: params });
  $(".serv-popup").removeClass("area-visible").addClass("area-hidden");
}
