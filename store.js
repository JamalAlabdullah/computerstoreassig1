
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

//------------------------------test fetch image----------------------------------------

const handleLaptopMenuChange=  e => {
    const selectedLaptop= laptops[e.target.selectedIndex];
    descriptionElement.innerText= selectedLaptop.description;  
      
    const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com/";
    function addCurrLaptop(current) {
        imageElement.innerHTML = "";
        let laptopImage = document.createElement("img");
        laptopImage.src = BASE_URL + current.image;
        laptopImage.alt = "Computer";
        laptopImage.style.width="200px";
        laptopImage.style.height="200px";
        laptopImage.style.marginLeft="10px";
        laptopImage.onerror = () => { 
            laptopImage.src = BASE_URL + current.image.replace("jpg", "png")
        }
        imageElement.append(laptopImage);  
    }
    fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
        .then((res) => res.json())
        .then((json) => { 
             json.forEach(item => console.log((item)));
           let initialLaptop = laptops[0];
            addCurrLaptop(initialLaptop);
        }); 
//--------------------------------------------------------------------------------

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
//  (work) button to increase pay balance 100 for every click
const payElement=document.getElementById("work");
const addWorkElement=document.getElementById("addWork");
//const balanceElement = document.getElementById("balance");
const bankElement = document.getElementById("bankButton");

const outstandingElement =document.getElementById("outstandLoan");
// Add work 100 by 100 and transfer work amount to bank balance, then reset pay
let work = 0
payElement.innerHTML=0+" Kr";
balanceElement.innerHTML=0+" Kr";
const handleAddWork= () => {
    work+= 100;

   payElement.innerHTML=work+" Kr";
   // Transfer work amount
   const transferMoney = () => {
    // before transfer money, I check if there is already outstanding loan, 
    // if there is, then i deducted 10 % of salary and transfer it to outstanding  
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

