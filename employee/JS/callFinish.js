const call = document.querySelectorAll(".table-info__callList i");

// console.log(call);

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

  console.log(callinfoObj);

  $.ajax({ url: "callFinish.php", type: "get", data: callinfoObj });

  getTableItem();
}

//아이콘을 전체를 찾아서 아이콘 전체에 클릭 액션을 넣어야하고, <-- 포이치가 필요해...
//전체 아이콘을.......................커리셀렉트올을 하래..

//////////////////////

const foodCall = document.querySelectorAll(".table-info__row");
const drinkCall = document.querySelectorAll(".table-info__drink-info");
console.log(foodCall);
foodCall.forEach((element) => {
  console.log(element);
  foodTableNum =
    element.parentElement.parentElement.previousElementSibling.querySelector(
      ".table-info__number"
    );
  element.addEventListener("click", handleToDoFoodDrinkClick);
});

drinkCall.forEach((element) => {
  drinkTableNum =
    element.parentElement.parentElement.previousElementSibling.querySelector(
      ".table-info__number"
    );
  element.addEventListener("click", handleToDoFoodDrinkClick);
});

function handleToDoFoodDrinkClick(event) {
  drinkFoodCallObj = {
    Name: event.target.innerHTML,
    Table:
      event.target.parentElement.parentElement.previousElementSibling.querySelector(
        ".table-info__number"
      ).innerHTML,
  };
  $.ajax({ url: "drinkFoodFinish.php", type: "get", data: drinkFoodCallObj });

  console.log(drinkFoodCallObj);

  getTableItem();
}
