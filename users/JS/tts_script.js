$(document).ready(function () {
  // 감시할 요소 설정 
  var targetNode = document.querySelector('.chatdisplayArea-messageDiv');

  // 어떤 변화를 감지할 것인지 옵저버 설정
  var config = {
    childList: true,  // 자식 요소의 추가/삭제 감지
    subtree: true     // 대상 노드의 모든 하위 트리 감지 ->왜하는거지?
  };

  var callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
	mutation.addedNodes.forEach(function(node) {
          // 만약 추가된 노드가 .bot 클래스를 가지고 있다면
          if (node.classList.contains('bot')) {
            console.log(node.textContent); // 새로 추가된 .bot의 내용을 출력

	    tts_function(node.textContent);
          }
        });
      }
    }
  };

  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

}); //document.ready.function

function tts_function(text) {
  // 주어진 텍스트를 localStorage에 저장
  localStorage.setItem("enteredText", text);

  // 요청 데이터 객체를 생성
  var requestData = {
    'input': {
    'text': text
    },
    'voice': {
      'languageCode': 'ko-KR',
      'ssmlGender': 'FEMALE'
    },
    'audioConfig': {
      'audioEncoding': 'MP3'
    }
  };
    
  // Google TTS API endpoint URL
  var ttsUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize?key=';

  fetch(ttsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
  .then(response => response.json())
  .then(data => {
    var audioContent = data['audioContent'];
        
    // 오디오 플레이어 소스를 업데이트하고 재생합니다.
    var audioPlayer = document.getElementById("audioPlayer");
    //audioPlayer.muted = true;
    audioPlayer.src = "data:audio/mpeg;base64," + audioContent;
    audioPlayer.play();
  })
  .catch(error => {
    console.error("Error:", error);
  });
}
