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

var silenceTimer = null;
var hasProcessed = false;
let isRecognitionActive = true;

function createNewRecognition() {
  var newRecognition = new webkitSpeechRecognition();
  newRecognition.continuous = true;
  newRecognition.interimResults = false;
  newRecognition.onresult = function (event) {
    console.log("음성 대기 중 ...");
    //console.log(window.speechSynthesis.onvoiceschanged);
    document.dispatchEvent(new Event("eardos"));

    if (silenceTimer) {
      clearTimeout(silenceTimer);
      hasProcessed = false;
    }

    let lastTranscript =
      event.results[event.results.length - 1][0].transcript.trim();

    silenceTimer = setTimeout(() => {
      if (!hasProcessed) {
        console.log(lastTranscript);
        flaskAjax(lastTranscript);
        hasProcessed = true;
      }
    }, 500);
  };

  // STT가 종료되었을 때
  newRecognition.onend = function () {
    console.log("상시 대기 모드 종료...");
    document.dispatchEvent(new Event("closeEyes"));
    isRecognitionActive = false;
  };

  return newRecognition;
}

$(document).ready(function () {
  setTimeout(function () {
    document.dispatchEvent(new Event("hellodos"));
    addMessageToChat("bot", "어서오세요. 주문을 도와드리는 키오스키입니다.");
    addMessageToChat("selector", "메뉴 검색");
    addMessageToChat("selector", "오늘의 추천 메뉴");
    addMessageToChat("selector", "메뉴 추천 서비스");
    addMessageToChat("selector", "직원 호출");
  }, 4000);
  setTimeout(function () {
    document.dispatchEvent(new Event("doridos"));
  }, 6000);

  $(".chatArea-stopSTT").off("click").on("click", function () {
    $.ajax({
      url: '/flask-app/update_state2',
      type: 'POST', 
      contentType: 'application/json',
      data: JSON.stringify({status: 'initial'}),
      success: function(response) {
        document.dispatchEvent(new Event("doridos"));
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  // 직접 텍스트 입력했을 때 챗봇
  $(".chatdisplayArea-messageInput-sendBtn").click(function () {
    let transcript = $(".chatdisplayArea-messageInput-text").val();

    flaskAjax(transcript);
  });

  // 음성으로 입력할 때 챗봇
  if ("webkitSpeechRecognition" in window) {
    let recognition = createNewRecognition();

    recognition.start();

    // STT가 종료되어 잠들어있는 꿈돌이 터치해서 깨우기
    $("#webgl-container")
      .off("click")
      .on("click", function () {
        if (!isRecognitionActive) {
          console.log("상시 대기 모드 시작...");
          recognition = createNewRecognition();
          recognition.start();
          isRecognitionActive = true;
          document.dispatchEvent(new Event("doridos"));
        } else if (isRecognitionActive) {
          recognition.stop();
          // document.dispatchEvent(new Event("doridos"));
        }
      });

    // 상시대기 STT 종료, chatArea에서 키오스키를 불러주세요! 바로 아래 위치
    //$(".chatArea-stopSTT")
    //  .off("click")
    //  .on("click", function () {
    //    recognition.stop();
    //    console.log("상시 대기 모드 종료");
    //  });
    // 상시대기 STT 종료
    $("#stopChromeSTT")
      .off("click")
      .on("click", function () {
        recognition.stop();
        console.log("상시 대기 모드 종료");
      });
    // 상시대기 stt 시작
    $("#startChromeSTT")
      .off("click")
      .on("click", function () {
        recognition = createNewRecognition();
        recognition.start();
        console.log("상시 대기 모드 시작");
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
        //addMessageToChat("bot", `${data.message}`);

        switch (data.action) {
          case "chat-shoppingCart-popup":
            addMessageToChat("bot", `${data.message}`);
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
              $(".shoppingCart-txt").html(data);
              shoppingCartPopupFunction();
              document.dispatchEvent(new Event("headRdos"));
              $(".shoppingCart-popup-okBtn2")
                .off("click")
                .on("click", function () {
                  // 이미 장바구니에 담은 메뉴라면?
                  let isExist = false;
                  let cartquantity, newitemprice, olditemprice;
                  $("#cart .cart-item:visible").each(function () {
                    if ($(this).find(".menu-name").text() == window.menuName2) {
                      console.log(window.menuName2);
                      let totalPriceText = $("#total-price").text();
                      let totalPrice = parseInt(
                        totalPriceText.replace(/,/g, "")
                      );
                      cartquantity = parseInt($(this).find(".quantity").text());
                      olditemprice = parseInt(
                        $(this).find(".item-price").text().replace(",", "")
                      );

                      cartquantity += window.menuQuantity2;
                      newitemprice = window.menuPrice2 * window.menuQuantity2;
                      olditemprice += newitemprice;
                      totalPrice += newitemprice;

                      $(this).find(".quantity").text(cartquantity);
                      $(this)
                        .find(".item-price")
                        .text(
                          olditemprice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        );
                      $(this)
                        .find(".single-price")
                        .text(
                          olditemprice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        );
                      $("#total-price").text(
                        totalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      );
                      isExist = true;
                      return false;
                    }
                  });
                  if (!isExist) {
                    addToCart4(
                      window.menuImg2,
                      window.menuName2,
                      window.menuPrice2,
                      window.menuQuantity2
                    );
                  } else {
                    console.log("장바구니에 이미 있음");
                  }
                  $(".shoppingCart-popup")
                    .removeClass("area-visible")
                    .addClass("area-hidden");
                  $(".shoppingCart-popup-informQuantity").text("1");
                  $(".shoppingCart-popup-quantityInt").text("1");
                });
            });
            break;

          case "chat-shoppingCart-popup-Edit":
            addMessageToChat("bot", `${data.message}`);
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
            addMessageToChat("bot", `${data.message}`);
            shoppingCartPopupOkBtn();
            document.dispatchEvent(new Event("jumpdos"));
            setTimeout(function () {
              document.dispatchEvent(new Event("doridos"));
            }, 500);
            break;

          case "chat-shoppingCart-popup-closeBtn":
            addMessageToChat("bot", `${data.message}`);
            $(".shoppingCart-popup-closeBtn").trigger("click");
            document.dispatchEvent(new Event("suprizedos"));
            setTimeout(function () {
              document.dispatchEvent(new Event("doridos"));
            }, 500);
            break;

	  case "rollbackbase":
	    addMessageToChat("bot", `${data.message}`);
	    if($(".shoppingCart-popup").is(":visible")) {
	      $(".shoppingCart-popup").removeClass("area-visible").addClass("area-hidden");
	    }
	    if($(".shopcartAll-popup").is(":visible")) {
	      $(".shopcartAll-popup").removeClass("area-visible").addClass("area-hidden");
	    }
	    if($(".orderList-popup").is(":visible")) {
	      $(".orderList-popup").removeClass("area-visible").addClass("area-hidden");
	    }
	    break;
          case "orderBtn-popup-click-trigger":
            if ($(".cart-item:visible").length > 0) {
              addMessageToChat("bot", `${data.message}`);
              $("#orderButton_popup").trigger("click");
              document.dispatchEvent(new Event("headRdos"));
            } else {
              addMessageToChat("bot", `${data.message2}`);
              //alert("장바구니 비어있음!!!");
              $.ajax({
                url: "/flask-app/update_state",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ new_state: "initial" }),
                dataType: "json",
                success: function (response) {
                  console.log("State updated successful!!");
                },
              });
              $(".shoppingCart-popup-closeBtn").trigger("click");
              document.dispatchEvent(new Event("suprizedos"));
              setTimeout(function () {
                document.dispatchEvent(new Event("doridos"));
              }, 500);
            }
            break;
          case "orderBtn-click-trigger":
            addMessageToChat("bot", `${data.message}`);
            $("#orderButton").trigger("click");
            document.dispatchEvent(new Event("doridos"));
            break;
          case "orderBtn-close-click-trigger":
            addMessageToChat("bot", `${data.message}`);
            $("#canselButton").trigger("click");
            document.dispatchEvent(new Event("suprizedos"));
            setTimeout(function () {
              document.dispatchEvent(new Event("doridos"));
            }, 500);
            break;

          case "loadpage":
            addMessageToChat("bot", `${data.message}`);
            loadpage_menubar__voice(data.page);
            //localStorage.setItem("userState", 0);
            break;

          case "loadpage-search":
            addMessageToChat("bot", `${data.message}`);
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
            addMessageToChat("bot", `${data.message}`);
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
            addMessageToChat("bot", `${data.message}`);
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
            addMessageToChat("bot", `${data.message}`);
            console.log(data.matchCall);
            let matchCall = {
              tableid: $("#table-number").text(),
              serviceText: data.matchCall,
            };
            if (data.matchCall != -1)
              $.ajax({ url: "callSend.php", type: "get", data: matchCall });
          case "callEmployee":
            addMessageToChat("bot", `${data.message}`);
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
