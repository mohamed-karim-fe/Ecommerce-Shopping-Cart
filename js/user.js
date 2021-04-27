"use strict";
let links = document.querySelector("#links");
let userInfo = document.querySelector("#user-info");
let userDom = document.querySelector("#user");
let logOutBtn = document.querySelector("#log-out");
let checkUser = localStorage.getItem("username");
if (checkUser){
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = checkUser;
}
logOutBtn.addEventListener("click",function(){
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html";
    },1500)
})