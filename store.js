
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
    laptops.forEach( x =>addLaptopToMenu(x))}

const addLaptopToMenu=(laptop)=>{
    const laptopElement= document.createElement("option");
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement);
}

// Here I added event listner to the selected laptop from the menu
const handleLaptopMenuChange= e => {
    const selectedLaptop= laptops[e.target.selectedIndex];
    descriptionElement.innerText= selectedLaptop.description;
}

laptopsElement.addEventListener("change",handleLaptopMenuChange)
// -------------------------------------------------------------------------------------------------------------------------------