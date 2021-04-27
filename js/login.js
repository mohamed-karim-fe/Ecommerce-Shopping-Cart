"use strict";
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign-in");
let checkUsername = localStorage.getItem("username");
let checkPassword = localStorage.getItem("password");
loginBtn.addEventListener("click",login);
function login(e){
    e.preventDefault();
    if (username.value === "" || password.value === ""){
        alert("Please Fill Data");
    }else{
        if ((checkUsername && checkUsername === username.value) && (checkPassword && checkPassword === password.value)){
            setTimeout(() => {
                window.location = "index.html";
            },1500)
        }else{
            alert("Username Or Password Is Wrong");
        }
    }
}