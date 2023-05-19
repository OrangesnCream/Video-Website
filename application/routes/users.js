var express = require('express');
var router = express.Router();
var db =require('../conf/database');
var bcrypt =require('bcrypt');
var{isLoggedIn,isMyProfile}=require("../middleware/auth");
const {isUsernameUnique,usernameCheck,passwordCheck,emailCheck}=require("../middleware/validation");
/* GET users listing. */
router.get('/', async function(req, res, next) {
try{
  let[rows,fields]=await db.query(`select * from users;`);
  res.status(200).json({rows,fields});

}catch(error){
  next(error);
}
});

router.post('/registration',usernameCheck,emailCheck,passwordCheck,isUsernameUnique,async function(req,res,next){
 var {username,Email,password}=req.body;
  try{

    var hashedPassword= await bcrypt.hash(password,3);
    var [resultObject,fields]= await db.execute(`INSERT INTO users
     (username,email,password) value (?,?,?);`,[username,Email,hashedPassword]);

     if(resultObject&&resultObject.affectedRows==1){
      req.flash("success",`Account created :D`);
      return req.session.save(function(err){
        return res.redirect("/login");
      });
     }else{
      req.flash("error",`${username} failed to register`);
      return req.session.save(function(err){
        return res.redirect('/registration');
      });
     }
  }catch(error){
    next(error);

  }


});
router.post('/login',async function(req,res,next){
  var {username,password}=req.body;
   try{
    if(!username||!password){
      return res.redirect("/login")
    }else{
      var [rows,fields]= await db.execute(`SELECT id,username,password,email 
      from users where username=? `,
      [username]);
      var user=rows[0];
      if(!user){
        req.flash("error",`Log In Failed: Invalid username/password`);
        req.session.save(function(err){
          return res.redirect("/login");
      });
      }else{
        var passwordsMatch= await bcrypt.compare(password,user.password);
        if(passwordsMatch){
            req.session.user={
              userId: user.id,
              email: user.email,
              username: user.username
            };
            req.flash("success",`You are now logged in`);
            req.session.save(function(err){
              return res.redirect("/");
            });
        }else{
            return res.redirect("/login");
        }
      }
    
    }
   }catch(error){
     next(error);
 
   }
 
 
 });
 router.use(function(req,res,next){
  if(req.session.user){

    next();
  }else{
    return res.redirect('/login');
  }

 });
 router.post('/logout',async function(req,res,next){
  req.session.destroy(function(err){
    if(err){
      next(error);
    }
    return res.redirect('/');
  })
 });
router.get("/profile/:id(\\d+)",isLoggedIn,isMyProfile,function(req,res){
  res.render("profile");
});
module.exports = router;
