"use strict";
//Variables
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = localStorage.getItem("editProductId");
let getProduct = products.find(item => item.id == productId);
let updateForm = document.querySelector("#update-form");
let inputFile = document.querySelector("#upload-image-file");
let productName = document.querySelector("#product-name");
let productDesc = document.querySelector("#product-desc");
let productSizeSelect = document.querySelector("#product-size");
let productSizeValue;
let productImage;
productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productImage = getProduct.imageUrl;
//Events
productSizeSelect.addEventListener("change",getProductSizeValue);
updateForm.addEventListener("submit",updateProductFun);
inputFile.addEventListener("change",uploadImageFun);
//Functions
function getProductSizeValue(e){
    productSizeValue = e.target.value;
}
function updateProductFun(e){
    e.preventDefault();
    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeValue;
    getProduct.imageUrl = productImage;
    localStorage.setItem("products",JSON.stringify(products));
    setTimeout(() => {
        window.location = "index.html";
    },500)
}
function uploadImageFun(){
    let file = this.files[0];
    getImageBase64(file);
    let types = ["image/jpeg","image/png"];
    if (types.indexOf(file.type) === -1){
        alert("Type Not Supported");
        return;
    }
    if (file.size > 2 * 1024 * 1024){
        alert("Image Not Exced 2MG");
        return;
    }
}
function getImageBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        productImage = reader.result;
    }
    reader.onerror = function(){
        alert("Error!!");
    }
}