const tableNums = document.querySelectorAll(".table-info__number");
console.log(tableNums);

fetch("../config.json") // 설정 파일 로드
  .then((response) => response.json())
  .then((data) => {
    const host = data.Host;
    newURL = "https://" + host + "/flask-app/employee";
    //플라스크 url 연결
  })
  .catch((error) => {
    console.error("Error loading config.json:", error);
  });

$(document).ready(function () {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    //웹 음성인식 API 사용
    recognition.continuous = true;
    //웹 상시 음성인식 기능 ON
    recognition.interimResults = true;
    /* //true : 연속된 단어를 종합하여 문장으로 인식 false : 단일 단어로 인식 ecognition.lang : 기본값 en-US,
* 한국어 사용 :ko-KR
recognition.maxAlternatives : 숫자가 적을 수록 발음대로 작성 숫자가 크면 이상한 단어도
* 적합하게 수정
*/
    let ListeningUserMessage = false;

    recognition.onresult = function (event) {
      //음성인식결과
      console.log("음성 대기 중 ...");
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          console.log(transcript);
          //음성인식결과 문장 출력 flask 챗봇 응답

          $.ajax({
            url: newURL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: transcript }),
            success: function (data) {
              if (data.action == "completeMenu") {
                if (data.table == -1) {
                  console.log("테이블 번호를 확인");
                } else {
                  console.log("re: " + data.table + "번 테이블");
                  if (data.num == -1) {
                    console.log("메뉴 번호를 확인");
                  } else {
                    console.log(data.num + "번 완료");
                    clearMenuNum(data.num, data.table);
                  }
                }
              } else if (data.action == "completeTable") {
                console.log("re: " + data.table + "번 테이블");
                if (data.table == -1) {
                  console.log("번호를 확인");
                } else {
                  console.log(data.matchMenu);
                  clearMenuName(data.matchMenu, data.table);
                }
              } else if (data.action == "completeMenuName") {
                console.log("re: " + data.table + "번 테이블");
                if (data.table == -1) {
                  console.log("번호를 확인");
                } else {
                  console.log(data.matchMenu);
                  clearMenuName(data.matchMenu, data.table);
                }
              } else if (data.action == "noSoldOutMenu") {
                console.log("re: " + data.soldOutMenu + "품절해제");
                if (data.soldOutMenu == "no menu") {
                  console.log(data.soldOutMenu);
                } else {
                  sendSoldOut(data.soldOutMenu, 0);
                  if (localStorage.getItem("chefMode") == 0) {
                    $.ajax({ url: "soldout.php", type: "get" }).done(function (
                      data
                    ) {
                      $(".main-screen").html(data);
                    });
                  }
                }
              } else if (data.action == "soldOutMenu") {
                console.log("re: " + data.soldOutMenu + " 품절");
                if (data.soldOutMenu == "no menu") {
                  console.log(data.soldOutMenu);
                } else {
                  sendSoldOut(data.soldOutMenu, 1);
                  if (localStorage.getItem("chefMode") == 0) {
                    $.ajax({ url: "soldout.php", type: "get" }).done(function (
                      data
                    ) {
                      $(".main-screen").html(data);
                    });
                  }
                }
              } else if (data.action == "completeCall") {
                console.log("re: " + data.table + "번 테이블");
                tableNums.forEach((element) => {
                  if (element.innerHTML == data.table) {
                    console.log(element);
                    let callLists = element.parentElement.querySelectorAll(
                      ".table-info__callList i"
                    );
                    callLists.forEach((element) => {
                      element.click();
                    });
                  }
                });
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

function clearCall(searchtable) {
  let doclick = 0;

  console.log(searchtable);
}
