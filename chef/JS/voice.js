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
          console.log(newURL);
          $.ajax({
            url: newURL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: transcript }),
            success: function (data) {
              console.log(data);
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
