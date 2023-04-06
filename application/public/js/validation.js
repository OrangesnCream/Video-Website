let username="";
let password="";
function validateUsername(username){
    if(username.length>=3&&isNaN(username[0])&& Boolean(username.match(/^[A-Za-z0-9]+$/))){
        return true;
    }else{
        return false;
    }
}
function validatePassword(password){
    let hasUpper="";
    let hasNum;
    let hasSpecial=/[/*-+!@#$^&~[]]/;
    if(password.length>=8&&/[A-Z]/.test(password)&&/\d/.test(password)&& hasSpecial.test(password)){
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
document.getElementById("reg-password").addEventListener("input",function(ev) {
    let userPassword=ev.currentTarget;
    password=userPassword.value;
    if(validatePassword(password)){
        userPassword.classList.add("valid-text");
        userPassword.classList.remove("invalid-text");
    }else{
        userPassword.classList.add("invalid-text");
        userPassword.classList.remove("valid-text");
    }
});