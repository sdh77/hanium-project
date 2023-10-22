var shakeEyebtn = document.querySelector(".shakeEye");
var shackHeadbtn = document.querySelector(".shackHead");
var leftHeadbtn = document.querySelector(".leftHead");
var rightHeadbtn = document.querySelector(".rightHead");
var jumpbtn = document.querySelector(".jump");
var shakeEarbtn = document.querySelector(".shakeEar");
var hellobtn = document.querySelector(".hello");

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
  addMessageToChat("selector", "메뉴 검색");
  addMessageToChat("selector", "오늘의 추천 메뉴");
  addMessageToChat("selector", "메뉴 추천 서비스");
  addMessageToChat("selector", "직원 호출");

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
    ".chatdisplayArea .chatdisplayArea-messageDiv"
  );
  if (sender == "bot") {
    chromeTTS(message);
    if ((message = "이해하지 못했습니다. 다시 한 번 말씀해주세요.")) {
      leftHeadbtn.click();
    }
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

          case "orderBtn-popup-click-trigger":
            $("#orderButton_popup").trigger("click");
            break;
          case "orderBtn-click-trigger":
            $("#orderButton").trigger("click");
            break;
          case "orderBtn-close-click-trigger":
            $("#canselButton").trigger("click");
            break;

          case "loadpage":
            loadpage_menubar__voice(data.page);
            //localStorage.setItem("userState", 0);
            break;

          case "loadpage-search":
            search_list = "";
            search_lists = data.searchMenus.split(",");
            for (i = 0; i < search_lists.length; i++) {
              if (i == search_lists.length - 1)
                search_list = `${search_list}'${search_lists[i]}'`;
              else search_list = `${search_list}'${search_lists[i]}', `;
            }
            loadpage_search__voice(search_list);
            localStorage.setItem("userState", 0);
            break;

          case "loadpage-recommend":
            recommend_list = "";
            recommend_lists = data.recommendMenus.split(",");
            for (i = 0; i < recommend_lists.length; i++) {
              if (i == recommend_lists.length - 1)
                recommend_list = `${recommend_list}'${recommend_lists[i]}'`;
              else
                recommend_list = `${recommend_list}'${recommend_lists[i]}', `;
            }
            loadpage_recommend__voice(recommend_list);
            localStorage.setItem("userState", 0);
            break;

          case "loadpage-spicy":
            spicy_list = "";
            spicy_lists = data.spicyMenus.split(",");
            for (i = 0; i < spicy_lists.length; i++) {
              if (i == spicy_lists.length - 1)
                spicy_list = `${spicy_list}'${spicy_lists[i]}'`;
              else spicy_list = `${spicy_list}'${spicy_lists[i]}', `;
            }
            loadpage_spicy__voice(spicy_list);
            //localStorage.setItem("userState", 0);
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
      } else if (data.response) {
        // 일반 응답
        addMessageToChat("bot", `${data.response}`);
      }
    },
  });
}

// 상단 메뉴바 페이지 출력
function loadpage_menubar__voice(pagename) {
  /*
  var params = {
    action: "menubar",
    menubar: pagename,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  }); */
  var $menus = $(".menu");

  $menus.each(function () {
    var onClickAttr = $(this).attr("onclick");

    if (onClickAttr && onClickAttr.includes(`set_type('${pagename}')`)) {
      change_check(this);
      return false;
    }
  });
}
// 검색 메뉴 페이지 출력
function loadpage_search__voice(search_list) {
  var params = {
    action: "search",
    search: search_list,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  });
}
// 추천 메뉴 페이지 출력
function loadpage_recommend__voice(recommend_list) {
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
// 매운 메뉴 페이지 출력
function loadpage_spicy__voice(spicy_list) {
  var params = {
    action: "spicy",
    spicy: spicy_list,
  };
  $.ajax({ url: "list_div.php", type: "get", data: params }).done(function (
    data
  ) {
    $("#menupage").html(data);
  });
}
