const laptopsElement=document.getElementById("laptops");
const descriptionElement=document.getElementById("descript");
const imageElement= document.getElementById("laptopImage"); 
const titleElement= document.getElementById("infLaptopTitle");  
const priceElement= document.getElementById("price"); 
const descElement= document.getElementById("desc");
const balanceElement = document.getElementById("balance");

let laptops =[];
let loans=0;
let balanceAccount=0;

// Showing selected laptop and its description through selected menu. 
// fetch the data from the url source
fetch(" https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => laptops=data)
.then(laptops=>addlaptopsToMenu(laptops))

const addlaptopsToMenu= (laptops)=> {
    laptops.forEach( x =>addLaptopToMenu(x))
    descriptionElement.innerHTML=laptops[0].description;
    titleElement.innerHTML=laptops[0].title;
    descElement.innerHTML=laptops[0].description;
    priceElement.innerHTML= laptops[0].price+ " Kr"; 
    const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com/";
    imageElement.style.width="200px";
    imageElement.style.height="200px";
    imageElement.style.marginLeft="px";
    imageElement.src= BASE_URL+laptops[0].image
}

const addLaptopToMenu=(laptop)=>{
    const laptopElement= document.createElement("option");
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement);
}

//------------------------------test fetch image----------------------------------------

const handleLaptopMenuChange=  e => {
    const selectedLaptop= laptops[e.target.selectedIndex];
    descriptionElement.innerText= selectedLaptop.description; 
    const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com/";
    imageElement.style.width="200px";
    imageElement.style.height="200px";
    imageElement.style.marginLeft="px";
    imageElement.src= BASE_URL+selectedLaptop.image.replace("jpg","png");
    console.log(imageElement.src= BASE_URL+selectedLaptop.image);
    titleElement.innerHTML=selectedLaptop.title;
    descElement.innerHTML=selectedLaptop.description;
    priceElement.innerHTML= selectedLaptop.price+ " Kr"; 
   
    // -------------------------  Handle (Buy Now) button --------------------------------------
    const buyNowElement = document.getElementById("buyNowbtn");
   
    const handleBuyNowBtn = () => {
        if ( balanceAccount < selectedLaptop.price ) {
            alert("Your balance account is not sufficient for this purchase");       
        }else{
            balanceAccount -= selectedLaptop.price;
            balanceElement.innerHTML= balanceAccount;
            alert("You are now the owner of the new laptop!");
        }
    }
    buyNowElement.addEventListener("click",handleBuyNowBtn);
}
laptopsElement.addEventListener("change",handleLaptopMenuChange)
// ---------------------------------------------------------------------------------
//  (work) button to increase pay balance 100 for every click,and transfer work amount to bank balance
const payElement=document.getElementById("work");
const addWorkElement=document.getElementById("addWork");
const bankElement = document.getElementById("bankButton");
const outstandingElement =document.getElementById("outstandLoan");
let work = 0
payElement.innerHTML=0+" Kr";
balanceElement.innerHTML=0+" Kr";
const handleAddWork= () => {
    work+= 100;
   payElement.innerHTML=work+" Kr";
   // Transfer work amount
   const transferMoney = () => {
    // check if there is already outstanding loan,then deducted 10 % of salary and transfer it to outstanding  
     if (loans!=0){
        let deductedAmount=(work*10)/100;
        outstandingElement.innerHTML=parseInt(loans)+deductedAmount;
     }  
       balanceElement.innerHTML=work+" Kr";
       payElement.innerHTML=0+" Kr"; 
       balanceAccount=work;
   }
   bankElement.addEventListener("click",transferMoney);   
}
addWorkElement.addEventListener("click",handleAddWork);
// ------------------------  Get a loan ----------------------------------------------
const getLoanElement= document.getElementById("getLoan");
const rePayBtn= document.getElementById("repay");

const getLoan = () =>{
    if(loans!=0){
        alert("You cannot get more than one bank loan")   
    }else{
        const amountToPay = prompt("Please enter the amount you want to loan: ");
        if (amountToPay == "") {
            alert("Amount can not be empty.");
          } else {
            //alert("You entered: " + amountToPay);
          }
          if(amountToPay > work*2){
            alert("You cannot get a loan more than double of your bank balance")
          }else {
            outstandingElement.innerHTML=amountToPay +" Kr";
            alert("You got the loan you applied for!") 
            loans=amountToPay;
            console.log(loans);   
        if (rePayBtn.style.display === "none") {
                rePayBtn.style.display = "block";
            } else {
                rePayBtn.style.display = "none";
            }        
          }
          const rePayLoan = () =>{
            console.log("test repay button");
            let result=0;
            if(amountToPay>= work){
                result=amountToPay-work
                balanceElement.innerHTML=0+"Kr";
                outstandingElement.innerHTML=result+" Kr";
                loans=0;
                alert("You repaid: "+work+ " and the amount still to pay is "+result);
            }else {
                result=work-amountToPay
                balanceElement.innerHTML=result +" Kr";
                outstandingElement.innerHTML=0 +" Kr";
                loans=0;
                alert("You payed your loan and your balance account now is: "+ result);
            }
           
        }
    
        rePayBtn.addEventListener("click",rePayLoan);

    }  
     
}
getLoanElement.addEventListener("click",getLoan);

