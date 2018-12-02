/*let url = document.URL;

let type = url.split('#');
let hash = '';
if(type.length > 1){
    hash = type[1];
alert(hash);
}*/

let hash = window.location.hash;
console.log(hash);
let subStringHash = hash.substring(1);// remove substring om document URL
console.log(subStringHash);
let newHash = subStringHash;
if (subStringHash.includes("/") === true){
    newHash = "";
    let rev = subStringHash.split("").reverse().join("");
    console.log(rev);
    let find = rev.search("/");
    console.log(find);
    let sub = rev.substring(find + 1);
    console.log(sub);
    let newH = sub.split("").reverse().join("");
    
    newHash = newH;
}



let mainDom = document.querySelector("#main");
let main = document.querySelector("main");
let subBreed = document.querySelector("#subBreed");
let menuDom  = document.querySelector("menu");
let listBreed = document.querySelector("#mylist");


let baseUrl = "https://dog.ceo/api/breeds";

function req(method, url, data, cb) {
  let req = new XMLHttpRequest();
  req.addEventListener("load", function() {
    if (this.status >= 200 && this.status < 300) {
      let data = null;
      if (this.responseText) {
        data = JSON.parse(this.responseText);
      } 
      if (typeof cb === "function") cb(null, data);
    } else {
      if (typeof cb === "function") cb(new Error("Invalid status"), null);
    }
  });

  req.open(method, url);
  if (data) {
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
  } else {
    req.send();
  }
}


function getDataBreed() {
    if (hash){
  req("GET", "https://dog.ceo/api/breed/" + subStringHash + "/images/random", undefined, function(err, data) {
    if (err) {
      console.error(err);
    } 
      else {
      imgRender(data.message, "getDataBreed()", uppCase(subStringHash));
    }
  });
}}
function getDataRamdom() {
  req("GET", baseUrl + "/image/random", undefined, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      imgRender(data.message, "getDataRamdom()", "Random Dog");
    }
  });
}
function getDataAllBreeds() {
  req("GET", baseUrl + "/list/all", undefined, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      breedList(data.message);
    }
  });
}

function getDataSubBreeds() {
  req("GET", "https://dog.ceo/api/breed/" + newHash + "/list", undefined, function(err, data) {
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
    let newBr = document.createElement("br");
    let newImg = document.createElement("img");
    newImg.setAttribute("src", data);
    let newBtn = document.createElement("button");
    newBtn.setAttribute("id", "switchBtn");
    newBtn.innerHTML = "Byta Bild";
    
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
    let newUl = document.createElement("ul");
    newUl.setAttribute("id", "subBredd");
        
        for (let subBreed in data){
            console.log(subBreed);
            let newList = document.createElement("li");
            let newA = document.createElement("a");
            newA.setAttribute("href", "#" + subBreed);
            newA.setAttribute("onClick", "fixHach(this)");
            
            newA.textContent = uppCase(subBreed);
            
            listBreed.appendChild(newList);
            newList.appendChild(newA);
        
    }
}


function subBreedList(data){
    console.log(data);
    let newUl = document.createElement("ul");
    subBreed.appendChild(newUl);
    for (let sub of data){
     let newLi = document.createElement("li");
        console.log(sub);
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
