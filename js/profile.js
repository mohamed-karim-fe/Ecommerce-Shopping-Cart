"use strict";
let getUsername = localStorage.getItem("username");
let getEmail = localStorage.getItem("email");
let getImage = localStorage.getItem("userImage");
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let myProducts = products.filter(item => item.isMe === "Yes");
let userImage = document.querySelector(".user-avatar");
let userNameDom = document.querySelector("#username");
let emailDom = document.querySelector("#email");
let productsLength = document.querySelector("#products-length span");
userNameDom.innerHTML = getUsername;
emailDom.innerHTML = getEmail; 
userImage.src = getImage ? getImage : "images/avatar.jpg";
if (myProducts.length !== 0){
    productsLength.innerHTML = myProducts.length;
}else{
    productsLength.parentElement.remove();
}