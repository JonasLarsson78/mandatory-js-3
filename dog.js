let hash = window.location.hash;
let subStringHash = hash.substring(1);
let newHash = subStringHash;
let endHash = "";

if (subStringHash.includes("/") === true){
    newHash = "";
    let rev = subStringHash.split("").reverse().join("");
    let find = rev.search("/");
    let sub = rev.substring(find + 1);
    let newH = sub.split("").reverse().join("");
    newHash = newH;
    let sub2 = subStringHash.substring(find + 1);
    endHash = " " + "-" + " " + uppCase(sub2);
}

let mainDom = document.querySelector("#main");
let main = document.querySelector("main");
let subBreed = document.querySelector("#subBreed");
let menuDom  = document.querySelector("menu");
let listBreed = document.querySelector("#mylist");

function req(method, url, data, cb) {
  let req = new XMLHttpRequest();
    req.addEventListener("load", function() {
    if (this.status >= 200 && this.status < 300) {
        let data = null;
    if (this.responseText) {
        data = JSON.parse(this.responseText);
      } 
        if (typeof cb === "function") cb(null, data);
    } 
        else {
        if (typeof cb === "function") cb(new Error("Invalid status"), null);
    }
  });

  req.open(method, url);
  if (data) {
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
  }
    else {
    req.send();
  }
}

function getDataBreed() {
    if (hash){
  req("GET", "https://dog.ceo/api/breed/" + subStringHash + "/images/random", undefined, (err, data) => {
    if (err) {
      console.error(err);
    }
    else {
      imgRender(data.message, "getDataBreed()", uppCase(newHash) + " " + endHash);
    }
  });
}}

function getDataRamdom() {
  req("GET", "https://dog.ceo/api/breeds/image/random", undefined, (err, data) => {
    if (err) {
      console.error(err);
    }
    else {
      imgRender(data.message, "getDataRamdom()", "Random Dog");
    }
  });
}

function getDataAllBreeds() {
  req("GET", "https://dog.ceo/api/breeds/list/all", undefined, (err, data) => {
    if (err) {
      console.error(err);
    } 
    else {
      breedList(data.message);
    }
  });
}

function getDataSubBreeds() {
  req("GET", "https://dog.ceo/api/breed/" + newHash + "/list", undefined, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      subBreedList(data.message);
    }
  });
}

function imgRender(data, click, message){
        mainDom.innerHTML = "";
    
    let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "breeds");
    let newBr = document.createElement("br");
    let newImg = document.createElement("img");
        newImg.setAttribute("src", data);
    let newBtn = document.createElement("button");
        newBtn.setAttribute("id", "switchBtn");
        newBtn.innerHTML = "New image";
        newBtn.setAttribute("onClick", click);
        newDiv.innerHTML = message;
    
        mainDom.appendChild(newDiv);
        mainDom.appendChild(newBr);
        mainDom.appendChild(newImg);
        mainDom.appendChild(newBr);
        mainDom.appendChild(newBtn);
}

let newH2 = document.createElement("h2");
    
    newH2.textContent = "All Breeds:";
    menuDom.appendChild(newH2);

function breedList(data){
        
    for (let allBreed in data){
        let newList = document.createElement("li");
        let newA = document.createElement("a");
            newA.setAttribute("href", "#" + allBreed);
            newA.setAttribute("onClick", "fixHach(this)");
            newA.textContent = uppCase(allBreed);
            
            listBreed.appendChild(newList);
            newList.appendChild(newA);
    }
}

function subBreedList(data){
    let newH2 = document.createElement("h2");
        newH2.textContent = "Sub Breeds:";
    let newUl = document.createElement("ul");
        newUl.setAttribute("id", "subBreedUl");
        if (data.length !== 0){
            subBreed.appendChild(newH2);  
    }
    
        subBreed.appendChild(newUl);
    for (let sub of data){
        let newLi = document.createElement("li");
            newLi.setAttribute("class", "subBreedLi");
        let newA = document.createElement("a");
            newA.setAttribute("href", "#" + newHash + "/" + sub);
            newA.setAttribute("onClick", "fixHach(this)");
            newA.textContent = uppCase(sub);
        
            newUl.appendChild(newLi);
            newLi.appendChild(newA);
    }
}

function fixHach(e){
   let click = e.target;
    let newHa = "#" + click.value;
        window.location.hash = newHa;
        location.reload();
}

function uppCase(str){
    let x =  str.charAt(0).toUpperCase() + str.slice(1);
    return x;
}

if(hash){
   getDataBreed();
   getDataSubBreeds();
}
if(hash === ""){
   getDataRamdom(); 
} 
getDataAllBreeds();
