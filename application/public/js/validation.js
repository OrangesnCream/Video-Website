let username="";

function validateUsername(username){
    if(username.length>=3&&isNaN(username[0])&& Boolean(username.match(/^[A-Za-z0-9]+$/))){
        return true;
    }else{
        return false;
    }
}

document.getElementById("username").addEventListener("input",function(ev){
    let userInput=ev.currentTarget;
    username= userInput.value;
    if (validateUsername(username)){
        userInput.classList.add("valid-text");
        userInput.classList.remove("invalid-text");
    }else{
        userInput.classList.add("invalid-text");
        userInput.classList.remove("valid-text");
    }
});
document.getElementById("register-button").addEventListener("submit",function(ev){
    ev.preventDefault();

   if(validateUsername(username)){
        console.log(ev);
        ev.currentTarget.submit();
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    }else{
        return;
    }


});