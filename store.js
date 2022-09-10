

const laptopsElement=document.getElementById("laptops");
const descriptionElement=document.getElementById("descript");
let laptops =[];




const imageElement= document.getElementById("laptopImage"); 
const titleElement= document.getElementById("infLaptopTitle");  
const priceElement= document.getElementById("price"); 
const descElement= document.getElementById("desc");


// This section to deal with showing the laptops through selected menu and 
//show the description for the selected laptop.
// fetch the data from the url source
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
// show description in Laptops card and (title,price,description in Info card)
const handleLaptopMenuChange= e => {
    const selectedLaptop= laptops[e.target.selectedIndex];
    descriptionElement.innerText= selectedLaptop.description;   
    //https://dog.ceo/api/breeds/image/random
    fetch("https://noroff-komputer-store-api.herokuapp.com/")
    .then(response => response.json())
    .then(result => imageElement.src=result.message)

    titleElement.innerHTML=selectedLaptop.title;
    descElement.innerHTML=selectedLaptop.description;
    priceElement.innerHTML= selectedLaptop.price;   
}
laptopsElement.addEventListener("change",handleLaptopMenuChange)
// ---------------------------------------------------------------------------------

//  (work) button to increase pay balance 100 for every click
const payElement=document.getElementById("work");
const addWorkElement=document.getElementById("addWork");
const balanceElement = document.getElementById("balance");
const bankElement = document.getElementById("bankButton");
// Add work 100 by 100 and transfer work amount to bank balance, then reset pay
let work = 0
payElement.innerHTML=0+" Kr";
balanceElement.innerHTML=0+" Kr";
const handleAddWork= () => {
    work+= 100;
   payElement.innerHTML=work+" Kr";
   // Transfer work amount
   const transferMoney = () => {
       balanceElement.innerHTML=work+" Kr";
       payElement.innerHTML=0+" Kr";  
   }
   bankElement.addEventListener("click",transferMoney);  
}
addWorkElement.addEventListener("click",handleAddWork);

// ------------------------  Get a loan ----------------------------------------------
const getLoanElement= document.getElementById("getLoan");
const outstandingElement =document.getElementById("outstandLoan");
const getLoan = () =>{
    console.log("get loan test");
    const amountToPay = prompt("Please enter the amount you want to loan: ");
    if (amountToPay == "") {
        alert("Amount can not be empty.");
      } else {
        //alert("You entered: " + amountToPay);
      }
      if(amountToPay > work*2){
        console.log(work*2);
        alert("You cannot get a loan more than double of your bank balance")
      }else {
        outstandingElement.innerHTML=amountToPay;

      }
      
}

getLoanElement.addEventListener("click",getLoan);




