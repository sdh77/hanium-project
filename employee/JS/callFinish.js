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
    call : event.target.classList.item(1),
    tableNumber: event.target.parentNode.previousSibling.innerHTML
  };

  // console.log(callinfoObj);

  $.ajax({url: "callFinish.php", type: "get", data: callinfoObj});
  
  getTableItem();
}

//////////////////////////////////////////////////////////////////////////////

const foodCall = document.querySelectorAll(".select-row");
const drinkCall = document.querySelectorAll(".select-row");


foodCall.forEach((element) => {
  // let foodTableNum = element.parentElement.parentElement.previousElementSibling.querySelector(".table-info__number");
  element.addEventListener("click", handleToDoFoodDrinkClick);
});

drinkCall.forEach((element) => {
  // let drinkTableNum = element.parentElement.parentElement.previousElementSibling.querySelector(".table-info__number");
  element.addEventListener("click", handleToDoFoodDrinkClick);
});


function handleToDoFoodDrinkClick(event){

  console.dir(event);
  
  const drinkFoodCallObj = {
    Name : event.target.parentElement.lastChild.innerHTML,
    Table : event.target.parentElement.parentElement.parentElement.previousElementSibling.querySelector(".table-info__number").innerHTML
  };
  $.ajax({url: "drinkFoodFinish.php", type: "get", data: drinkFoodCallObj});

  console.log(drinkFoodCallObj);

  getTableItem();
}

/////////////////////////////////////////////////////////////////////////////

const tableFinish = document.querySelectorAll(".table-info__number");

// console.log(tableFinish);

tableFinish.forEach((element) => {
  element.addEventListener("click", handleToDoTableClick);
  // console.log(element);
});


function handleToDoTableClick(event){
  console.log(event);
  const tableFinishObj = {
    number : event.target.innerHTML
  };
  
  $.ajax({url: "tableFinish.php", type: "get", data: tableFinishObj});
  getTableItem();
}