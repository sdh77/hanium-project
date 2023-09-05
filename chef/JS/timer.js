const times = document.querySelectorAll(
  ".tableOrderItem .tableOrderItem__time"
);

function set_time() {
  const now = new Date();
  let h = Number(now.getHours().toString().padStart(2, "0"));
  let m = Number(now.getMinutes().toString().padStart(2, "0"));
  let s = Number(now.getSeconds().toString().padStart(2, "0"));

  times.forEach(function (time) {
    const a = time.classList.item(2);
    const newH = Number(substr(a, 0, 2));
    const newM = Number(substr(a, 3, 2));
    const newS = Number(substr(a, 6, 2));

    time.innerHTML = count(h - newH, m - newM, s - newS) + "분";
  });
}

function count(h, m, s) {
  const set = h * 60 + m + s / 60;
  return set;
}
