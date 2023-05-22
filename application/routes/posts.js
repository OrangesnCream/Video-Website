var express=require('express');
var router =express.Router();
var multer= require('multer');
var db=require('../conf/database');
const { makeThumbnail, getPostById} = require('../middleware/posts');
const { isLoggedIn } = require('../middleware/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/videos/uploads")
    },
    filename: function (req, file, cb) {
        var fileExt= file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
  });
  
  const upload = multer({ storage: storage });
router.post("/create",isLoggedIn,upload.single("uploadVideo"),makeThumbnail,async function(req,res,next) {
    var {title,description}=req.body;
    var{path,thumbnail}=req.file;
    var{userId}=req.session.user;
    console.log(req.body);
    try {
        var[insertResult, _ ]=await db.execute(
            `INSERT INTO posts (title,description,video,thumbnail,fk_userId) VALUE (?,?,?,?,?);`,[title,description,path,thumbnail,userId]
        );
        if(insertResult&&insertResult.affectedRows){
            req.flash("success","Your post was created!");
            return req.session.save(function(error){
                if(error){next(error)};
                return res.redirect(`/posts/${insertResult.insertId}`);
            });
        }else{
            next(new Error('Post could not be created'));

        }
    } catch (error) {
        next(error);
    }

});
router.get('/:id(\\d+)',getPostById,function(req,res){
   console.log( req);
    res.render('viewpost',{pageTitle:"",js:["viewpost.js"]});
  });

router.get("/search",function (req,res,next) {
    console.log(req.query);
    res.end();
});
router.delete("delete",function(req,res,next){

});
module.exports= router;