const list_container = document.querySelector("#item-container");
const list = document.querySelector("#cart");
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
  list_container.addEventListener("mousemove", onScrollMove);
  list_container.addEventListener("touchmove", onScrollMove);
  list_container.addEventListener("mouseup", onScrollEnd);
  list_container.addEventListener("touchend", onScrollEnd);
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

  list_container.removeEventListener("mousemove", onScrollMove);
  list_container.removeEventListener("touchmove", onScrollMove);
  list_container.removeEventListener("mouseup", onScrollEnd);
  list_container.removeEventListener("touchend", onScrollEnd);

  setTimeout(() => {
    list.style.transition = "";
  }, 300);
};

list_container.addEventListener("mousedown", onScrollStart);
list_container.addEventListener("touchstart", onScrollStart);
