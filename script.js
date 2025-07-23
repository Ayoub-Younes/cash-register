const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const itemPrice = document.getElementById("price");
const drawer = document.getElementById("drawer");

let price = 2;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

itemPrice.innerText = `ITEM PRICE: ${price}$`;
drawer.innerHTML= '<p class="black">Change in drawer:</p>'
cid.forEach(ar => drawer.innerHTML += `<p  class="cash">${ar[0]}: $${ar[1]}</p>`);


//Function check
const drawerCheck = () => {
  if (isNaN(cash.value) || Number(cash.value) <= 0) {
    return alert("Please enter a valid positive number");
  }
  const coins =  [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  cid.map((arr, index) => {
  arr.splice(1,0,coins[index],Math.round(arr[1]/coins[index]));
});
cid.reverse();
  let changeRet = [];
  let e = 0;
  let c = Number(cash.value);
  let d = c - price;
  if(d < 0){
  return alert("Customer does not have enough money to purchase the item")
} else if (d === 0){
  changeDue.innerHTML = '<p class="black">No change due - customer paid with exact cash</p>';
} else if (d > 0) {
  const exchange = () => {
  for (let i = 0; i < cid.length ; i++){
if(d >= cid[i][1] && cid[i][3]){
  if (d >= cid[i][3]) {
    d = d - cid[i][3] ;
    d = Math.round(d * 100) / 100
    e = cid[i][3];
  } else if (d < cid[i][3] ){
    e = d - d % cid[i][1];
    d = d % cid[i][1];
    d = Math.round(d * 100) / 100;   
  } 
cid[i][3] -= e;   
changeRet.push([cid[i][0], e]);
}
} 
}
exchange();

if (d === 0){
  const chashleft = cid.reduce((total,arr) => total + arr[3], 0);
  console.log(chashleft);
  const display = arr => {
   let text = "";
arr.forEach(ar => text += `<p class="cash">${ar[0]}: $${ar[1]}</p>`);
return text;
 }
  if(chashleft === 0){
    changeDue.innerHTML =`<p class="black">Status: CLOSED</p>${display(changeRet)}`
  } else {
    changeDue.innerHTML =`<p class="black">Status: OPEN</p>${display(changeRet)}`
  }
} else {
    changeDue.innerHTML = '<p class="black">Status: INSUFFICIENT_FUNDS</p>';
}

}
let text  = changeDue.innerHTML.replace(/\s$/,"");
changeDue.innerHTML = text;
cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
}

purchaseBtn.addEventListener("click",drawerCheck)
cash.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    drawerCheck();
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('background-img');
    const mainContent = document.body;

    let imageLoaded = false;

    function showContent() {
      mainContent.style.display = 'flex';
    }

    if (img.complete) {
      imageLoaded = true;
      showContent();
    } else {

      img.onload = function() {
        imageLoaded = true;
        showContent();
      };
    }

    // Fallback in case the image takes too long or fails to load
    setTimeout(function() {
      if (!imageLoaded) {
        showContent();
      }
    }, 3000);
  });