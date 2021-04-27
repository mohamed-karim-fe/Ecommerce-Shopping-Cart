"use strict";
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".details");
let productDetails = products.find(item => item.id == productId);
itemDom.innerHTML = `
    <img src="${productDetails.imageUrl}" alt="">
    <h2>${productDetails.title}</h2>
    <p>${productDetails.desc}</p>
    <span>Size: ${productDetails.size}</span>
    ${productDetails.isMe === "Yes"?"<button onclick='editProduct("+ productDetails.id +")'>Edit Product</button>":''}
`
//Edit Product
function editProduct(id){
    localStorage.setItem("editProductId",id);
    window.location = "edit-product.html";
}
let myViews = localStorage.getItem("myViews")?JSON.parse(localStorage.getItem("myViews")):[];
let isProductInCart = myViews.some(i => i.id === productDetails.id);
if (isProductInCart){
    myViews = myViews.map(item => {
        if (item.id === productDetails.id) console.log("y");
        return item;
    }) 
}else{
    myViews.push(productDetails);
}
localStorage.setItem("myViews",JSON.stringify(myViews));