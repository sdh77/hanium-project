const list = document.querySelector(".list");
const listScrollWidth = list.scrollWidth;
const listClientWidth = list.clientWidth;
console.log(list);
// 이벤트마다 갱신될 값
let startX = 0;
let nowX = 0;
let endX = 0;
let listX = 0;

const getClientX = (e) => {
  const isTouches = e.touches ? true : false;
  return isTouches ? e.touches[0].clientX : e.clientX;
};

const getTranslateX = () => {
  return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
};

const setTranslateX = (x) => {
  list.style.transform = `translateX(${x}px)`;
};

const onScrollStart = (e) => {
  startX = getClientX(e);
  list.addEventListener("mousemove", onScrollMove);
  list.addEventListener("touchmove", onScrollMove);
  list.addEventListener("mouseup", onScrollEnd);
  list.addEventListener("touchend", onScrollEnd);
};

const onScrollMove = (e) => {
  nowX = getClientX(e);
  setTranslateX(listX + nowX - startX);
};

const onScrollEnd = (e) => {
  endX = getClientX(e);
  listX = getTranslateX();
  if (listX > 0) {
    setTranslateX(0);
    list.style.transition = `all 0.3s ease`;
    listX = 0;
  } else if (listX < listClientWidth - listScrollWidth) {
    setTranslateX(listClientWidth - listScrollWidth);
    list.style.transition = `all 0.3s ease`;
    listX = listClientWidth - listScrollWidth;
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
