var orderTimes = document.querySelectorAll(
  ".main-screen .main-area .tableOrderItem .tableOrderItem__time"
);

function set_time() {
  checkTable();
  const now = new Date();
  let h = Number(now.getHours().toString().padStart(2, "0"));
  let m = Number(now.getMinutes().toString().padStart(2, "0"));
  let s = Number(now.getSeconds().toString().padStart(2, "0"));

  orderTimes.forEach(function (time) {
    const a = time.classList.item(1);
    const newH = Number(a.substr(0, 2));
    const newM = Number(a.substr(3, 2));
    const newS = Number(a.substr(6, 2));
    time.innerHTML = count(h - newH, m - newM, s - newS) + "분";
  });
}

function count(h, m, s) {
  const set = h * 60 + m + Math.round(s / 60);
  return set;
}
