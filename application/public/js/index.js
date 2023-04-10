var url="https://jsonplaceholder.typicode.com/albums/2/photos";
var numberPost=document.getElementById('list-size');
var originalText=numberPost.textContent;
async function fetchWithDOMAPI(){
    try{
        var response = await fetch(url);
        var data= await response.json();
        console.log(data);
        var elements =data.map(buildCard);
        document.getElementById('product-list').append(...elements);
        
    }catch(error){
        console.log(error);
    }
    updateCounter();
}
function fadeOut(ev){
    var ele= ev.currentTarget;
    let timer=setInterval(function (){
        if (!ele.style.opacity) {
            ele.style.opacity = 1;
        }
        if (ele.style.opacity > 0) {
            ele.style.opacity -= 0.05;
        } else {
            ele.remove();
            updateCounter();
            clearInterval(timer);
        }
    },50);
}
function updateCounter(){
    var elementCount=document.getElementsByClassName("product-card").length;
    numberPost.textContent= originalText+elementCount ;
}
function buildCard(data){
    var cardDiv=document.createElement("div");
    cardDiv.setAttribute("class","product-card");

    var imgTag=document.createElement("img");
    imgTag.setAttribute("class","product-img");
    imgTag.setAttribute("src",data.thumbnailUrl);

    var titleTag= document.createElement('p');
    titleTag.setAttribute('class',"product-title");
    titleTag.appendChild(document.createTextNode(data.title));

    var productDiv=document.createElement("div");
    productDiv.setAttribute("class","product-desc");

    productDiv.appendChild(titleTag);
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(productDiv);

    cardDiv.addEventListener('click',fadeOut);

    return cardDiv;
}   
fetchWithDOMAPI();
