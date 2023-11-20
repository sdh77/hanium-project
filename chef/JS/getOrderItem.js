const btn = document.querySelector(".Header .change-page");
const header = document.querySelector(".Header .Header-column span");

let selectYear = new Date().getFullYear();
let selectMonth = String(new Date().getMonth() + 1).padStart(2, "0");
let selectDate = String(new Date().getDate()).padStart(2, "0");
let date = `${selectYear}-${selectMonth}-${selectDate}`;

localStorage.setItem("chefMode", 1);
localStorage.setItem("clearTableNum", 0);

function orderItem() {
  localStorage.setItem("chefMode", 1);
  btn.innerHTML = "재고 관리";
  header.innerHTML = "주문 관리";

  getOrderItem("notClear");
  btn.removeEventListener("click", orderItem);
  btn.addEventListener("click", soldout);
  // window.scrollTo(100);
}

function soldout() {
  localStorage.setItem("chefMode", 0);
  btn.innerHTML = "주문 관리";
  header.innerHTML = "재고 관리";
  loadSoldOutPage();
  btn.removeEventListener("click", soldout);
  btn.addEventListener("click", orderItem);
}

/******************** */
function getOrderItem(clear) {
  let params = {
    today: date,
    action: clear,
  };
  $.ajax({ url: "postItem.php", type: "get", data: params }).done(function (
    data
  ) {
    $(".main-screen").html(data);
    set_time();
  });
  // }
}
function getOrderNotClearItem() {
  if (localStorage.getItem("chefMode") == 1) {
    let params = {
      today: date,
      action: "notClear",
    };
    $.ajax({ url: "postItem.php", type: "get", data: params }).done(function (
      data
    ) {
      $(".main-screen").html(data);
      set_time();
    });
  }
}
/***************************** */
function loadSoldOutPage() {
  $.ajax({ url: "soldout.php", type: "get" }).done(function (data) {
    $(".main-screen").html(data);
  });
}

chef_swipe = document.querySelector(".main-screen");
console.log(chef_swipe);
// 드래그(스와이프) 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;
let Tolerance = 100; //오차
// PC 클릭 이벤트 (드래그)
chef_swipe.addEventListener("mousedown", (e) => {
  console.log("mousedown", e.pageY);
  startPoint = e.pageY; // 마우스 드래그 시작 위치 저장
});

chef_swipe.addEventListener("mouseup", (e) => {
  console.log("mouseup", e.pageY);
  endPoint = e.pageY; // 마우스 드래그 끝 위치 저장
  if (startPoint - endPoint > Tolerance || endPoint - startPoint > Tolerance) {
    let chefNowState = localStorage.getItem("chefMode");
    if (chefNowState == 2) {
      getOrderItem("notClear");
      localStorage.setItem("chefMode", 1);
      console.log("notClear");
    } else if (chefNowState == 1) {
      getOrderItem("clear");
      localStorage.setItem("chefMode", 2);
      console.log("Clear");
    }
    console.log("prev move");
  }
});

// 모바일 터치 이벤트 (스와이프)
chef_swipe.addEventListener("touchstart", (e) => {
  console.log("touchstart", e.touches[0].pageY);
  startPoint = e.touches[0].pageY; // 터치가 시작되는 위치 저장
});
chef_swipe.addEventListener("touchend", (e) => {
  console.log("touchend", e.changedTouches[0].pageY);
  endPoint = e.changedTouches[0].pageY; // 터치가 끝나는 위치 저장
  if (startPoint - endPoint > Tolerance || endPoint - startPoint > Tolerance) {
    // 오른쪽으로 스와이프 된 경우
    let chefNowState = localStorage.getItem("chefMode");
    if (chefNowState == 2) {
      getOrderItem("notClear");
      localStorage.setItem("chefMode", 1);
      console.log("notClear");
    } else if (chefNowState == 1) {
      getOrderItem("clear");
      localStorage.setItem("chefMode", 2);
      console.log("Clear");
    }
    console.log("prev move");
  }
});

function chromeTTS(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

orderItem();
setInterval(getOrderNotClearItem, 1000);

let newPopupClick = document.querySelector(".neworder-popup-background");
let newPopupClick_txt = document.querySelector(
  ".neworder-popup-background__inform"
);

window.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target == newPopupClick || event.target == newPopupClick_txt) {
    newPopupClick.classList.add("area-hidden");
    newPopupClick.classList.remove("area-visible");
  }
});
