const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
let check;
function change1() {
  console.log("1");
  check = 1;
}
function change2() {
  console.log("2");
  check = 2;
}
function change3() {
  console.log("3");
  check = 3;
}

btn1.addEventListener("click", change1);
btn2.addEventListener("click", change2);
btn3.addEventListener("click", change3);
