var validator=require('validator');
var db=require('../conf/database');
module.exports={
    usernameCheck: function(req,res,next){
        var {username}=req.body;
        username=username.trim();
        if(!validator.isLength(username,{min:3,max:20})){
            req.flash("error","username must be 3 or more characters");
        }
        if(!/[a-zA-Z]/.test(username.charAt(0))){
            req.flash("error","username must begin with a character");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    passwordCheck: function(req,res,next){
        var {password}=req.body;
        if(!validator.isStrongPassword(password)){
            req.flash("error",`${password} is not a valid password`);
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    emailCheck:function(req,res,next){
        var {Email}=req.body;
        Email=Email.trim();
        if(!validator.isEmail(Email)){
            req.flash("error",`${Email} is not a valid Email`);
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }

    },
    tosCheck: function(req,res,next){},
    ageCheck:function(req,res,next){},
    isUsernameUnique:async function(req,res,next){
        var{username}=req.body;
        try {
            var [rows,fields]= await db.execute(`select id from users where username=?;`,[username]);
            if(rows&&rows.length>0){
                req.flash("error",`${username}is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    isEmailUniqur:async function(req,res,next){
        var {Email}=req.body;
    try {
            var [rows,fields]= await db.execute(`select id from users where email=?;`,[Email]);
            if(rows&&rows.length>0){
            req.flash("error",`${Email}is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
}