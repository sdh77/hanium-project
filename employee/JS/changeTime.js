const times = document.querySelectorAll(
  ".main-screen .table-info .table-info__orderTime"
);
const setTimes = document.querySelectorAll(
  ".main-screen .table-info .table-info__time"
);

function changeTime() {
  if (localStorage.getItem("employeeMode") == 1) {
    const now = new Date();
    let h = Number(now.getHours().toString().padStart(2, "0"));
    let m = Number(now.getMinutes().toString().padStart(2, "0"));
    let s = Number(now.getSeconds().toString().padStart(2, "0"));
    for (let i = 0; i < times.length; i++) {
      let settime = Math.round(
        (count(h, m, s) - Number(times[i].innerText)) / 60
      );
      if (settime < 0) {
        settime = 1400 + settime;
      }

      setTimes[i].innerText = settime + "분";
      if (Number(times[i].innerText) == 0) {
        setTimes[i].innerText = "0분";
      }
    }
  }
}
function count(h, m, s) {
  let set = h * 3600 + m * 60 + s;
  return set;
}
changeTime();
setInterval(changeTime, 1000);
