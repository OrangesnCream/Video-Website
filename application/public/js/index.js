var url="https://jsonplaceholder.typicode.com/albums/2/photos";
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
    productDiv.setAttribute("class","product-card");

    productDiv.appendChild(titleTag);
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(productDiv);
    return cardDiv;
}   
fetchWithDOMAPI();