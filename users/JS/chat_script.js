$(document).ready(function () {
  // 직접 텍스트 입력했을 때 챗봇
  $(".chatdisplayArea-messageInput-sendBtn").click(function () {
    let userMessage = $(".chatdisplayArea-messageInput-text").val();

    $.ajax({
      url: 'https://www.ddhye.com/flask-app/chat',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ message: userMessage }),
      success: function(data) {
	addMessageToChat('user', `${userMessage}`);
	addMessageToChat('bot', `${data.response}`);
      }
    });
  });

  // 음성으로 입력할 때 챗봇
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    let ListeningUserMessage = false;

    recognition.onresult = function(event) {
      console.log("음성 대기 중 ...");
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim();
          console.log(transcript);

          if (transcript.includes("키오스키야") && !ListeningUserMessage) {
	    document.querySelector(".chatArea").style.display = "none";
  	    document.querySelector(".chatdisplayArea").style.display = "block"; // jQuery 왜안됨

            // 메시지를 chatbox에 추가
            addMessageToChat('bot', "네, 부르셨어요?");
	    ListeningUserMessage = true;
	  } else if (ListeningUserMessage) {
	    addMessageToChat('user', transcript);
	    // flask 챗봇 응답
	    $.ajax({
              url: 'https://www.ddhye.com/flask-app/chat',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({ message: transcript }),
              success: function(data) {
                addMessageToChat('bot', `${data.response}`);
              }
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
    console.error('Browser does not support webkitSpeechRecognition.');
  }

});

function addMessageToChat(sender, message) {
  const messageDiv = $("<div>").addClass(sender).text(message);
  $(".chatdisplayArea-messageDiv").append(messageDiv);
}