const socket = io();

const form = document.getElementById("form");
const newBtn = document.getElementById("new");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const codeValue = document.getElementById("code");
const nameValue = document.getElementById("name");
const priceValue = document.getElementById("price");

const submitBtn = document.getElementById("submit");

let action = "new"

newBtn.addEventListener( "click" , () => { 
    nameValue.disabled = false;
    action = "new";
});
editBtn.addEventListener( "click" , () => { 
    nameValue.disabled = false;
    action = "edit";
 });
deleteBtn.addEventListener( "click" , () => { 
    nameValue.disabled = true;
    action = "delete";
 });

form.addEventListener( "submit" , (e) => { 
    e.preventDefault();
    socket.emit("newProduct", {
        prod: {
            code: codeValue.value,
            name: nameValue.value,
            price: priceValue.value,
        },
        action : action
    });

});

socket.on("productsUpdated", (products) => {
    const productsList = document.getElementById("productsListContainer");
    productsList.innerHTML = "";

    products.forEach((prod) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Code: ${prod.code} - Name: ${prod.name} - Price: ${prod.price}`
        productsList.appendChild(listItem);
    })
});

socket.on("result", (msg) => {
    alert(msg);    
    form.reset();
});
