"use strict";
let shoppingCartIcon = document.querySelector(".shopping-cart");
let badgeDom = document.querySelector(".badge");
let cartProductsMenu = document.querySelector(".cart-products");
let cartProductsDivDom = document.querySelector(".cart-products div");
//Check There Is Items In Local Storage
let addedItem = localStorage.getItem("productsInCart")?JSON.parse(localStorage.getItem("productsInCart")):[];
if (addedItem){
    addedItem.forEach(item => {
        cartProductsDivDom.innerHTML += `<p>${item.title}  <span class="item-qty">${item.qty}</span></p>`;
    });
    badgeDom.style.display = "block";
    badgeDom.innerHTML = addedItem.length;
}
//Open Cart Menu After Click
shoppingCartIcon.addEventListener("click",openCartMenu);
//Open Menu 
function openCartMenu(){
    if (cartProductsDivDom.innerHTML !== ""){
        if (cartProductsMenu.style.display === "block"){
            cartProductsMenu.style.display = "none";
        }else{
            cartProductsMenu.style.display = "block";
        }
    }
}