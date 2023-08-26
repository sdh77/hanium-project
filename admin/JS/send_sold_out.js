const none = document.querySelector("iframe");
const soldOutBtns = document.querySelectorAll('.list .btn .newSoldOut');

function alterSoldOut(target){
  let id = target.parentNode.parentNode.querySelector(".id").innerText; // Assuming the ID is stored in the inner text of the .id element
  if(target.innerText == "품절"){
    target.innerText = "판매중";
    none.src= 'soldout.php?newsoldout= 0 &newid=' + id;
  }
  else{
    target.innerText = "품절";
    none.src= 'soldout.php?newsoldout= 1 &newid=' + id;
  } 
}

soldOutBtns.forEach((target) =>{
  target.addEventListener("click",function(){
    alterSoldOut(target);
  })
});


