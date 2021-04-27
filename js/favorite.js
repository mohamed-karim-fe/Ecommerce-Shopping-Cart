"use strict";
let productsDom = document.querySelector(".products");
let noproductsDom = document.querySelector(".no-products");
function drawProductsInFavoriteUi(allProducts = []){
    let checkLS = localStorage.getItem("productsInFavorite");
    if ((!checkLS) || (checkLS && JSON.parse(checkLS).length == 0)){
        productsDom.style.float = "none";
        noproductsDom.innerHTML = "There Is No Items";
    }
    let products = JSON.parse(localStorage.getItem("productsInFavorite")) || allProducts;
    let productsUi = products.map(item => {
        return `
            <div class="product-item">
                <img src="${item.imageUrl}" alt="" class="product-item-img">
                <div class="product-item-desc">
                    <h2>${item.title}</h2>
                    <p>${item.desc}</p>
                    <span>Size: ${item.size}</span><br>
                    <span>Quantity: ${item.qty}</span>
                </div>
                <div class="product-item-action">
                    <button class="add-to-cart" onclick="removeFromFavorite(${item.id})">Remove From Favorite</button>
                </div>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
}
drawProductsInFavoriteUi();
function removeFromFavorite(id){
    let productsInFavorite = localStorage.getItem("productsInFavorite");
    if (productsInFavorite){
        let items = JSON.parse(productsInFavorite);
        let filteredItems = items.filter(item => item.id !== id);
        let myArr = JSON.parse(localStorage.getItem("products")) || productsDB;
        myArr.map(item => {
            if (item.id === id){
                delete item.liked;
            }
        })
        localStorage.setItem("products",JSON.stringify(myArr));
        localStorage.setItem("productsInFavorite",JSON.stringify(filteredItems));
        drawProductsInFavoriteUi(filteredItems);
    }
}