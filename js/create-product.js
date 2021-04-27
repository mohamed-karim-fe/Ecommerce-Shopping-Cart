"use strict";
//Variables
let createForm = document.querySelector("#create-form");
let inputFile = document.querySelector("#upload-image-file");
let productName = document.querySelector("#product-name");
let productDesc = document.querySelector("#product-desc");
let productSizeSelect = document.querySelector("#product-size");
let productSizeValue;
let productImage;
//Events
productSizeSelect.addEventListener("change",getProductSizeValue);
createForm.addEventListener("submit",createProductFun);
inputFile.addEventListener("change",uploadImageFun);
//Functions
function getProductSizeValue(e){
    productSizeValue = e.target.value;
}
function createProductFun(e){
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
    let nameValue = productName.value;
    let descValue = productDesc.value;
    if (nameValue && descValue){
        let obj = {
            id:allProducts?allProducts.length+1:1,
            title:nameValue,
            desc:descValue,
            size:productSizeValue,
            imageUrl:productImage,
            qty:1,
            isMe:"Yes",
        }
        let newProducts = allProducts?[...allProducts,obj]:[obj];
        localStorage.setItem("products",JSON.stringify(newProducts));
        inputFile.value = "";
        productName.value = "";
        productDesc.value = "";
        productSizeSelect.value = "";
        setTimeout(() => {
            window.location = "index.html";
        },500)
    }else{
        alert("Please Fill Data...");
    }
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