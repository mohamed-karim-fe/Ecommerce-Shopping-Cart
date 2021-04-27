"use strict";
let getUsername = localStorage.getItem("username");
let getEmail = localStorage.getItem("email");
let userImageInput = document.querySelector("#upload-image-profile");
let usernameInput = document.querySelector("#profile-name");
let userEmailInput = document.querySelector("#profile-email");
let editProfileForm = document.querySelector("#edit-profile-form");
let userImage;
usernameInput.value = getUsername;
userEmailInput.value = getEmail;
editProfileForm.addEventListener("submit",editProfileData);
userImageInput.addEventListener("change",uploadImageFun);
function editProfileData(e){
    e.preventDefault();
    localStorage.setItem("username",usernameInput.value);
    localStorage.setItem("email",userEmailInput.value);
    if (userImageInput.value != ""){
        localStorage.setItem("userImage",userImage);
    }else{
        localStorage.setItem("userImage","images/avatar.jpg");
    }
    setTimeout(() => {
        window.location = "profile.html";
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
        userImage = reader.result;
    }
    reader.onerror = function(){
        alert("Error!!");
    }
}