var express = require('express');
var router = express.Router();
var db =require('../conf/database');
/* GET users listing. */
router.get('/', async function(req, res, next) {
try{
  let[rows,fields]=await db.query(`select * from users;`);
  res.status(200).json({rows,fields});

}catch(error){
  next(error);
}
});

router.post('/registration',async function(req,res,next){
 var {username,Email,password}=req.body;
  try{
    var [rows,fields]= await db.execute(`select id from users where username=?;`,[username]);
    if(rows&&rows.length>0){
      return res.redirect('/registration');
    }
    var [rows,fields]= await db.execute(`select id from users where email=?;`,[Email]);
    if(rows&&rows.length>0){
      return res.redirect('/registration');
    }
    var [resultObject,fields]= await db.execute(`INSERT INTO users
     (username,email,password) value (?,?,?);`,[username,Email,password]);

     if(resultObject&&resultObject.affectedRows==1){
      return res.redirect("/login");
     }else{
      return res.redirect("/registration");
     }
  }catch(error){
    next(error);

  }


});

module.exports = router;
