"use strict";
let productsDom = document.querySelector(".products");
let noproductsDom = document.querySelector(".no-products");
//Display Products
let drawProductsUi;
(drawProductsUi = function(products = []){
    let productsUi = products.map(item => {
        return `
            <div class="product-item" style="border:${item.isMe === "Yes" ? "2px solid darkgreen" : ""}">
                <img src="${item.imageUrl}" alt="" class="product-item-img">
                <div class="product-item-desc">
                    <h2 onclick="saveItem(${item.id})">${item.title}</h2>
                    <p>${item.desc}</p>
                    <span>Size: ${item.size}</span>
                </div>
                <div class="product-item-action">
                    
                </div>
            </div>
        `
    })
        productsDom.innerHTML = productsUi.join("");
    if (products.length == 0){
        productsDom.style.float = "none";
        noproductsDom.innerHTML = "No Products!!";
    }
})(JSON.parse(localStorage.getItem("myViews")) || []);