fetch("../config.json") // 설정 파일 로드
  .then((response) => response.json())
  .then((data) => {
    const host = data.Host; // API 키 가져오기
    newURL = "https://" + host + "/flask-app/chef";
  })
  .catch((error) => {
    console.error("Error loading config.json:", error);
  });

$(document).ready(function () {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    let ListeningUserMessage = false;

    recognition.onresult = function (event) {
      console.log("음성 대기 중 ...");
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          console.log(transcript);

          // flask 챗봇 응답

          $.ajax({
            url: newURL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: transcript }),
            success: function (data) {
              if (data.action == "completeMenu") {
                if (data.table == -1) {
                  console.log("번호를 확인");
                } else {
                  console.log("re: " + data.table + "번 테이블");
                  if (data.matchMenu == -1) {
                    console.log("번호를 확인");
                  } else {
                    console.log(data.matchMenu + "번 완료");
                    clearMenuNum(data.matchMenu, data.table);
                  }
                }
              }
            },
          });
        }
      }
    };
    recognition.start();
  } else {
    console.error("Browser does not support webkitSpeechRecognition.");
  }
});

function clearMenuNum(searchnum, searchtable) {
  // console.log(searchnum, searchtable);
  finishTables.forEach(function (finishTable) {
    let thisTable = finishTable.querySelector(".orderTableId");
    if (thisTable.innerHTML == searchtable + "번 테이블") {
      console.log(thisTable);
      let thisTableLists =
        thisTable.parentElement.querySelectorAll(".orderdetail_list");
      thisTableLists.forEach(function (thisTableList) {
        let thisItem = thisTableList.querySelector(".tableOrderItem__menu");
        if (thisItem.innerHTML == searchnum + ".") {
          console.log(thisItem.innerHTML);
          // let params = {
          //   orderId: finishMenu.classList.item(1),
          // };

          // $.ajax({
          //   url: "clearMenu.php",
          //   type: "get",
          //   data: params,
          // });
        }

        // checkTable();
      });
    }
  });
}
