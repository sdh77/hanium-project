$(document).ready(function () {
  // 직접 텍스트 입력했을 때 챗봇
  $(".chatdisplayArea-messageInput-sendBtn").click(function () {
    let userMessage = $(".chatdisplayArea-messageInput-text").val();

    $.ajax({
      url: "https://localhost/flask-app/chat",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ message: userMessage }),
      success: function (data) {
        addMessageToChat("user", `${userMessage}`);

        // 딕셔너리 형태의 응답 중, data가 message가 있다면
        if (data.message) {
          addMessageToChat("bot", `${data.message}`);
          if (data.action === "chat-shoppingCart-popup") {
            //triggerShoppingCartPopup(data.message);

            // PHP로 메뉴이름과 수량 전송.
            // 메뉴이름으로 디비 이름과 이미지, 가격 불러오기
            // 메뉴이름, 이미지, 가격으로 .noSoldOut만들기 -> display:none으로 해야할듯?
            // menu_script.js의 addToCart3()함수에 인자로 이미지, 메뉴이름, 가격, 수량 넣어서 실행하기
            // 같은 메뉴 호출하면 중복 추가되는거 추후 해결해야 함
            var params = {
              menu: data.menu,
              quantity: data.quantity,
            };
            console.log(params);
            $.ajax({
              url: "showCheckPopup.php",
              type: "get",
              data: params,
            }).done(function (data) {
              $(".shoppingCart-popup")
                .removeClass("area-hidden")
                .addClass("area-visible");
              $(".shoppingCart-popup").html(data);
            });
          }
        } else if (data.response) {
          // 일반 응답
          addMessageToChat("bot", `${data.response}`);
        }
      },
    });
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
            // flask 챗봇 응답
            $.ajax({
              url: "https://localhost/flask-app/chat",
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({ message: transcript }),
              success: function (data) {
                addMessageToChat("bot", `${data.response}`);
              },
            });

            // 상시대기 STT 종료
            $("#stopChromeSTT").click(function () {
              recognition.stop();
              ListeningUserMessage = false;
              console.log("상시 대기 모드 종료");
            });
          }
        }
      }
    };

    recognition.start();
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
  messageArea.scrollTop = messageArea.scrollHeight;
}

// 장바구니 기능
function triggerShoppingCartPopup(botmessage) {
  //const botMessage = botmessage.match(/([\w\s]+)\s\d+개/);
  const botMessage = "페퍼로니 피자";
  if (botMessage) {
    //const botMessageMenu = botMessage[1];
    const botMessageMenu = botMessage;
    console.log("botMessageMenu", botMessageMenu);

    $(".grid .noSoldOut").each(function () {
      const noSoldOutMenuName = $(this).find(".menu").text();
      console.log("error1", noSoldOutMenuName);
      if (botMessageMenu === noSoldOutMenuName) {
        console.log("error2");
        $(this).click();
        return false;
      }
    });
  }
}
