"use strict";
let productsDom = document.querySelector(".products");
let noproductsDom = document.querySelector(".no-products");
function drawProductsInCartUi(allProducts = []){
    let checkLS = localStorage.getItem("productsInCart");
    if ((!checkLS) || (checkLS && JSON.parse(checkLS).length == 0)){
        productsDom.style.float = "none";
        noproductsDom.innerHTML = "There Is No Items";
    }
    let products = JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
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
                    <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                </div>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
}
drawProductsInCartUi();
function removeFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart");
    if (productsInCart){
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter(item => item.id !== id);
        let badgeDom = document.querySelector(".badge");
        let cartProductsDivDom = document.querySelector(".cart-products div");
        badgeDom.innerHTML = filteredItems.length;
        cartProductsDivDom.innerHTML = "";
        filteredItems.forEach(item => {
            cartProductsDivDom.innerHTML += `<p>${item.title}  <span class="item-qty">${item.qty}</span></p>`;
        });
        localStorage.setItem("productsInCart",JSON.stringify(filteredItems));
        drawProductsInCartUi(filteredItems);
    }
}