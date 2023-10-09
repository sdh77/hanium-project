fetch("../config.json") // 설정 파일 로드
  .then((response) => response.json())
  .then((data) => {
    const host = data.Host; // API 키 가져오기
    newURL = "https://" + host + "/flask-app/chat";
    // 나머지 코드
  })
  .catch((error) => {
    console.error("Error loading config.json:", error);
  });

$(document).ready(function () {
  addMessageToChat("bot", "어서오세요. 주문을 도와드리는 키오스키입니다.");

  // 직접 텍스트 입력했을 때 챗봇
  $(".chatdisplayArea-messageInput-sendBtn").click(function () {
    let transcript = $(".chatdisplayArea-messageInput-text").val();

    flaskAjax(transcript);
  });

  // 음성으로 입력할 때 챗봇
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

          /*
          if (transcript.includes("키오스키야") && !ListeningUserMessage) {
            document.querySelector(".chatArea").style.display = "none";
            document.querySelector(".chatdisplayArea").style.display = "block"; // jQuery 왜안됨

            // 메시지를 chatbox에 추가
            addMessageToChat(
              "bot",
              "어서오세요! 주문을 도와드리는 키오스키입니다^_^"
            );
            addMessageToChat("selector", "1. 메뉴 검색해줘");
            addMessageToChat("selector", "2. 추천메뉴 알려줘");
            addMessageToChat("selector", "3. 취향대로 추천해줘");
            addMessageToChat("selector", "4. 주문 도와줘");
            addMessageToChat("selector", "5. 직원 호출해 줘");

            ListeningUserMessage = true;
          } else if (ListeningUserMessage) {
            addMessageToChat("user", transcript);

	    flaskAjax(transcript);
          } */
          flaskAjax(transcript);
        }
      }
    };

    recognition.start();

    // 상시대기 STT 종료
    $("#stopChromeSTT").click(function () {
      recognition.stop();
      ListeningUserMessage = false;
      console.log("상시 대기 모드 종료");
    });
  } else {
    console.error("Browser does not support webkitSpeechRecognition.");
  }
});

// 챗봇, 유저, 선택지 출력
function addMessageToChat(sender, message) {
  const messageDiv = $("<div>").addClass(sender).text(message);
  $(".chatdisplayArea-messageDiv").append(messageDiv);
  const messageArea = document.querySelector(
    ".main .middlearea .chatdisplayArea .chatdisplayArea-messageDiv"
  );
  if (sender == "bot") {
    chromeTTS(message);
  }
  messageArea.scrollTop = messageArea.scrollHeight;
}
// 크롬 TTS
function chromeTTS(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// 챗봇 응답
function flaskAjax(transcript) {
  $.ajax({
    url: newURL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ message: transcript }),
    success: function (data) {
      addMessageToChat("user", `${transcript}`);

      // 딕셔너리 형태의 응답 중, data가 message가 있다면
      if (data.message) {
        addMessageToChat("bot", `${data.message}`);

        switch (data.action) {
          case "chat-shoppingCart-popup":
            // 응답 딕셔너리 중, 메뉴 이름과 수량을 php로 넘겨서 장바구니 팝업
            var params = {
              menu: data.menu,
              quantity: data.quantity,
            };
            $.ajax({
              url: "showCheckPopup.php",
              type: "get",
              data: params,
            }).done(function (data) {
              $(".shoppingCart-popup")
                .removeClass("area-hidden")
                .addClass("area-visible");
              $(".shoppingCart-popup").html(data);
              shoppingCartPopupFunction();
            });
            break;
          case "chat-shoppingCart-popup-Edit":
            quantityInit = window.menuQuantity2;
            quantityChange = data.quantity - quantityInit;

            if (quantityChange > 0) {
              for (let i = 0; i < quantityChange; i++) {
                $(".shoppingCart-popup-quantityIncrease2").trigger("click");
              }
            } else if (quantityChange == 0) {
            } else {
              for (let i = 0; i > quantityChange; i--) {
                $(".shoppingCart-popup-quantityDecrease2").trigger("click");
              }
            }
            break;
          case "chat-shoppingCart-popup-orderBtn":
            shoppingCartPopupOkBtn();
            break;
          case "chat-shoppingCart-popup-closeBtn":
            $(".shoppingCart-popup-closeBtn").trigger("click");
            break;
          case "orderBtn-click-trigger":
            $("#orderButton").trigger("click");
            break;
          case "call":
            console.log(data.matchCall);
            // console.log($("#table-number").text());
            let matchCall = {
              tableid: $("#table-number").text(),
              serviceText: data.matchCall,
            };
            if (data.matchCall != -1)
              $.ajax({ url: "callSend.php", type: "get", data: matchCall });
          case "callEmployee":
            let callEmployee = {
              tableid: $("#table-number").text(),
              serviceText: "직원 호출",
            };
            $.ajax({ url: "callSend.php", type: "get", data: callEmployee });
        }
      } else if (data.chatbotmessage) {
        addMessageToChat("bot", `${data.chatbotmessage}`);

        switch (data.action) {
          case "chatbot-selector":
            addMessageToChat("selector", "메뉴 검색");
            addMessageToChat("selector", "오늘의 추천 메뉴");
            addMessageToChat("selector", "메뉴 추천 서비스");
            addMessageToChat("selector", "직원 호출");
            break;
          case "chatbot-recommend":
            // SDH : 추천 메뉴 기능 php
            console.log("추천 메뉴");
            recommend_list = "";
            recommend_lists = data.recommendMenus.split(",");
            for (i = 0; i < recommend_lists.length; i++) {
              if (i == recommend_lists.length - 1)
                recommend_list = `${recommend_list}'${recommend_lists[i]}'`;
              else
                recommend_list = `${recommend_list}'${recommend_lists[i]}', `;
            }
            loadpage_list__voice(recommend_list);
            localStorage.setItem("userState", 0);
            break;
        }
      } else if (data.response) {
        // 일반 응답
        addMessageToChat("bot", `${data.response}`);
      }
    },
  });
}

function loadpage_list__voice(recommend_list) {
  var params = {
    action: "recommend",
    recommend: recommend_list,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  });
}
