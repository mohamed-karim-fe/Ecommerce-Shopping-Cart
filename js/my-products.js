"use strict";
let productsDom = document.querySelector(".products");
let noproductsDom = document.querySelector(".no-products");
//Display Products
let drawProductsUi;
(drawProductsUi = function(products = []){
    let myProducts = products.filter(item => item.isMe === "Yes");
    let productsUi = myProducts.map(item => {
        return `
            <div class="product-item" style="border:${item.isMe === "Yes" ? "2px solid darkgreen" : ""}">
                <img src="${item.imageUrl}" alt="" class="product-item-img">
                <div class="product-item-desc">
                    <h2 onclick="saveItem(${item.id})">${item.title}</h2>
                    <p>${item.desc}</p>
                    <span>Size: ${item.size}</span>
                </div>
                <div class="product-item-action">
                    <button class="add-to-cart edit-product" onclick="editProduct(${item.id})">Edit Product</button>
                    <button class="add-to-cart edit-product" onclick="deleteProduct(${item.id})">Delete Product</button>
                </div>
            </div>
        `
    })
        productsDom.innerHTML = productsUi.join("");
    if (myProducts.length == 0){
        productsDom.style.float = "none";
        noproductsDom.innerHTML = "No Products!!";
    }
})(JSON.parse(localStorage.getItem("products")) || productsDB);
//Edit Product
function editProduct(id){
    localStorage.setItem("editProductId",id);
    window.location = "edit-product.html";
}
//Delete Products
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let myProducts = products.filter((item) => item.isMe === "Yes");
    let filtered = myProducts.filter((i) => i.id !== id);
    let clickedItem = myProducts.find((i) => i.id === id);
    products = products.filter((i) => i.id !== clickedItem.id);
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUi(filtered);
    let favoriteItems = JSON.parse(localStorage.getItem("productsInFavorite")) || [];
    favoriteItems = favoriteItems.filter(item => item.id !== clickedItem.id);
    localStorage.setItem("productsInFavorite",JSON.stringify(favoriteItems));
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
    cartItems = cartItems.filter(item => item.id !== clickedItem.id) ;
    let badgeDom = document.querySelector(".badge");
    let cartProductsDivDom = document.querySelector(".cart-products div");
    badgeDom.innerHTML = cartItems.length;
    cartProductsDivDom.innerHTML = "";
    cartItems.forEach(item => {
        cartProductsDivDom.innerHTML += `<p>${item.title}  <span class="item-qty">${item.qty}</span></p>`;
    });
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
  }