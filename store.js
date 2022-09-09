
// This section to deal with showing the laptops through selected menu and sho the description for the selected laptop.
const laptopsElement=document.getElementById("laptops");
const descriptionElement=document.getElementById("descript");
let laptops =[];
// Her I fetch the data from the the url source
fetch(" https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => laptops=data)
.then(laptops=>addlaptopsToMenu(laptops))

const addlaptopsToMenu= (laptops)=> {
    laptops.forEach( x =>addLaptopToMenu(x))
    descriptionElement.innerHTML=laptops[0].description;

}

const addLaptopToMenu=(laptop)=>{
    const laptopElement= document.createElement("option");
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement);
}

// Here I added event listener to the selected laptop from the menu
const handleLaptopMenuChange= e => {
    const selectedLaptop= laptops[e.target.selectedIndex];
    descriptionElement.innerText= selectedLaptop.description;
}

laptopsElement.addEventListener("change",handleLaptopMenuChange)
// -------------------------------------------------------------------------------------------------------------------------------

//  (work) button to increase pay balance 100 for every click
const payElement=document.getElementById("work");
const addWorkElement=document.getElementById("addWork");
const balanceElement = document.getElementById("balance");
const bankElement = document.getElementById("bankButton");
// Add work 100 by 100 and transfer work amount to bank balance, then reset pay
let work = 0
payElement.innerHTML=0;
balanceElement.innerHTML=0;
const handleAddWork= () => {
    work+= 100;
   payElement.innerHTML=work;
   // Transfer work amount
   const transferMoney = () => {
       balanceElement.innerHTML=work;
       payElement.innerHTML=0;  
   }
   bankElement.addEventListener("click",transferMoney);  
}
addWorkElement.addEventListener("click",handleAddWork);




