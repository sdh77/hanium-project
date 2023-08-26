const soldouts = document.querySelectorAll("form div #newSoldOut");
const none = document.querySelector("iframe");
function alterSoldOut(id){
  let soldOut = document.getElementById("newSoldOut");
  if(soldOut.checked){
    location.replace = 'soldout.php?newsoldout= true &newid=' + id;
    none.src= 'soldout.php?newsoldout= true &newid=' + id;
  }
  else{
    location.replace = 'soldout.php?newsoldout= false &newid=' + id;
    none.src= 'soldout.php?newsoldout= false &newid=' + id;
  } 
}

