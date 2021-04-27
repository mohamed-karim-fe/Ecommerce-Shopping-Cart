"use strict";
//Define Products
let productsDom = document.querySelector(".products");
let products = productsDB;
//Draw Products
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
                    ${item.isMe === "Yes" && "<button class='edit-product' onclick='editProduct(" + item.id + ")'> Edit Product </button>"}
                </div>
                <div class="product-item-action">
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add To Cart</button>
                    <i class="favorite far fa-heart" onclick="addToFavorite(${item.id})" style="color:${item.liked === true?'red':''}"></i>
                </div>
            </div>
        `
    })
    productsDom.innerHTML = productsUi.join("");
    let proDesc = document.querySelectorAll(".product-item-desc");
    proDesc.forEach(item => {
        item.childNodes[6].remove();
    })
})(JSON.parse(localStorage.getItem("products")) || products);
//Add To Cart
function addToCart(id){
    if (checkUser){
        let allItems = JSON.parse(localStorage.getItem("products")) || products;
        let product = allItems.find(item => item.id === id);
        let isProductInCart = addedItem.some(i => i.id === product.id);
        if (isProductInCart){
            addedItem = addedItem.map(item => {
                if (item.id === product.id) item.qty += 1;
                return item;
            })
        }else{
            addedItem.push(product);
        }
        //Draw In UI
        cartProductsDivDom.innerHTML = "";
        addedItem.forEach(item => {
            cartProductsDivDom.innerHTML += `<p>${item.title} <span class="item-qty">${item.qty}</span></p>`;
        })
        //Save Items
        localStorage.setItem("productsInCart",JSON.stringify(addedItem));
        //Add Counter Of Items
        let cartProductsItems = document.querySelectorAll(".cart-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductsItems.length;
    }else{
        window.location = "register.html";
    }
}
//Save Item In Local Storage
function saveItem(id){
    localStorage.setItem("productId",id);
    window.location = "details.html";
}
//Search By Name
let searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup",function(e){
    search(JSON.parse(localStorage.getItem("products")) || products,e.target.value);
    if (e.target.value.trim() === ""){
        drawProductsUi(JSON.parse(localStorage.getItem("products")) || products);
    }
})
function search(myArr,title){
    let arr = myArr.filter(item => item.title.toLowerCase().indexOf(title) !== -1);
    drawProductsUi(arr);
}
//Add To Favorite
let favoriteItem = localStorage.getItem("productsInFavorite")?JSON.parse(localStorage.getItem("productsInFavorite")):[];
function addToFavorite(id){
    if (checkUser){
        let myArr = JSON.parse(localStorage.getItem("products")) || productsDB;
        let product = myArr.find(item => item.id === id);
        product.liked = true;
        let isProductInFavorite = favoriteItem.some(item => item.id === product.id);
        if (isProductInFavorite){
            
        }else{
            favoriteItem.push(product);
        }
        localStorage.setItem("productsInFavorite",JSON.stringify(favoriteItem));
        myArr.map(item => {
            if (item.id === product.id){
                item.liked = true;
            }
        })
        localStorage.setItem("products",JSON.stringify(myArr));
        drawProductsUi(myArr);
    }else{
        window.location = "register.html";
    }
}
//Filter Products By Size
let sizeFilter = document.querySelector("#size-filter");
sizeFilter.addEventListener("change",getProductsFilterBySize);
function getProductsFilterBySize(e){
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    if (val === "all"){
        drawProductsUi(products);
    }else{
        products = products.filter(item => item.size.toLowerCase() === val);
        drawProductsUi(products);
    }
}
//Edit Product
function editProduct(id){
    localStorage.setItem("editProductId",id);
    window.location = "edit-product.html";
}