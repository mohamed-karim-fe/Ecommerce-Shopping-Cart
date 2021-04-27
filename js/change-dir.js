"use strict";
let langDir = localStorage.getItem("langDir");
if (langDir){
    if (langDir === "rtl"){
        changeDir("rtl");
    }else{
        changeDir("ltr");
    }
}
let en = document.querySelector(".en-lang");
let ar = document.querySelector(".ar-lang");
en.addEventListener("click",() => changeDir("ltr"));
ar.addEventListener("click",() => changeDir("rtl"));
function changeDir(dir){
    document.documentElement.setAttribute("dir",dir);
    localStorage.setItem("langDir",dir);
}