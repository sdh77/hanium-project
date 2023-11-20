const list = document.querySelector(".list");
const listScrollHeight = list.scrollHeight;
const listClientHeight = list.clientHeight;
console.log(list);
// 이벤트마다 갱신될 값
let startY = 0;
let nowY = 0;
let endY = 0;
let listY = 0;

const getClientY = (e) => {
  const isTouches = e.touches ? true : false;
  return isTouches ? e.touches[0].clientY : e.clientY;
};

const getTranslateY = () => {
  return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
};

const setTranslateY = (y) => {
  list.style.transform = `translateY(${y}px)`;
};

const onScrollStart = (e) => {
  startY = getClientY(e);
  list.addEventListener("mousemove", onScrollMove);
  list.addEventListener("touchmove", onScrollMove);
  list.addEventListener("mouseup", onScrollEnd);
  list.addEventListener("touchend", onScrollEnd);
};

const onScrollMove = (e) => {
  nowY = getClientY(e);
  setTranslateY(listY + nowY - startY);
};

const onScrollEnd = (e) => {
  endY = getClientY(e);
  listY = getTranslateY();
  if (listY > 0) {
    setTranslateY(0);
    list.style.transition = `all 0.3s ease`;
    listY = 0;
  } else if (listY < listClientHeight - listScrollHeight) {
    setTranslateX(listClientHeight - listScrollHeight);
    list.style.transition = `all 0.3s ease`;
    listX = listClientHeight - listScrollHeight;
  }

  list.removeEventListener("mousemove", onScrollMove);
  list.removeEventListener("touchmove", onScrollMove);
  list.removeEventListener("mouseup", onScrollEnd);
  list.removeEventListener("touchend", onScrollEnd);

  setTimeout(() => {
    list.style.transition = "";
  }, 300);
};

list.addEventListener("mousedown", onScrollStart);
list.addEventListener("touchstart", onScrollStart);
