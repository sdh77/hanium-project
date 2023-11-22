const call = document.querySelectorAll(".table-info__callList i");
const Menus = document.querySelectorAll(".foodDrinkName");
// console.log(call);
var newCnt = Menus.length;
if (newCnt > Number(localStorage.getItem("menuCnt_employee"))) {
  const newPopup = document.querySelector(
    ".employee-neworder-popup-background"
  );
  audio.load();
  audio.loop = false;
  audio.play();
  newPopup.classList.add("area-visible");
  newPopup.classList.remove("area-hidden");
  setTimeout(() => {
    newPopup.classList.remove("area-visible");
    newPopup.classList.add("area-hidden");
  }, 4000);
  localStorage.setItem("menuCnt_employee", newCnt);
} else if (newCnt < Number(localStorage.getItem("menuCnt_employee"))) {
  if (localStorage.getItem("employeeMode") == 1) {
    localStorage.setItem("menuCnt_employee", newCnt);
  }
}
call.forEach((element) => {
  let tableNumber = element.parentNode.previousSibling;
  element.addEventListener("click", handleToDoClick);
  // console.log(tableNumber);
});

function handleToDoClick(event) {
  console.log(event);
  // console.log(event.target.classList.item(1));

  const callinfoObj = {
    call: event.target.classList.item(1),
    tableNumber: event.target.parentNode.previousSibling.innerHTML,
  };

  // console.log(callinfoObj);

  $.ajax({ url: "callFinish.php", type: "get", data: callinfoObj });
  setTimeout(getTableItem, 100);
}

//////////////////////////////////////////////////////////////////////////////

const foodDrinkCall = document.querySelectorAll(".select-row");

foodDrinkCall.forEach((element) => {
  // let foodTableNum = element.parentElement.parentElement.previousElementSibling.querySelector(".table-info__number");
  element.addEventListener("click", handleToDoFoodDrinkClick);
});

function handleToDoFoodDrinkClick(event) {
  console.dir(event);
  event.target.parentElement.classList.add("Finish-line");

  const drinkFoodCallObj = {
    orderId: event.target.parentElement.classList[2],
    Table:
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".table-info__number"
      ).innerHTML,
  };
  $.ajax({ url: "drinkFoodFinish.php", type: "get", data: drinkFoodCallObj });

  console.dir(
    event.target.parentElement.querySelector(".foodDrinkName").innerHTML
  );
  setTimeout(getTableItem, 100);
}

/////////////////////////////////////////////////////////////////////////////

const tableFinish = document.querySelectorAll(".table-info__number");

// console.log(tableFinish);

tableFinish.forEach((element) => {
  element.addEventListener("click", handleToDoTableClick);
  // console.log(element);
});

function handleToDoTableClick(event) {
  console.log(event);

  const tableFinishObj = {
    number: event.target.innerHTML,
  };

  $.ajax({ url: "tableFinish.php", type: "get", data: tableFinishObj });
  $.ajax({ url: "tableCallFinish.php", type: "get", data: tableFinishObj });

  setTimeout(getTableItem, 100);
}

//////////////////////////////////////////////////////////////////////////////

const foodFinishs = document.querySelectorAll(".table-info__food");

// console.log(foodFinish);

foodFinishs.forEach((foodFinish) => {
  foodFinish.addEventListener("click", handleToDoFoodClick);
});

function handleToDoFoodClick(event) {
  console.log(event);

  const foodFinishObj = {
    food: event.target.innerHTML,
  };
}
