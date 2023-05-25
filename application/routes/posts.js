var express=require('express');
var router =express.Router();
var multer= require('multer');
var db=require('../conf/database');
const { makeThumbnail, getPostById, getCommentsForPostsById, getOtherUserPosts } = require('../middleware/posts');
const { isLoggedIn } = require('../middleware/auth');
const { render } = require('../app');
const flash = require('express-flash');
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
router.get('/:id(\\d+)',getPostById,getCommentsForPostsById, getOtherUserPosts, function(req,res){
    res.render('viewpost',{pageTitle:"",js:["viewpost.js"]});
  });

router.get("/search",async function (req,res,next) {
    var {searchValue}=req.query;
    try {
        var[rows,_]=await db.execute(
            `select id,title,thumbnail, concat_ws(' ',title,description) as haystack from posts having haystack like ?;`,[`%${searchValue}%`]
        );
        if(rows&&rows.length==0){

        }else{
            res.locals.posts=rows;
            res.render('index');

        }//add later
    } catch (error) {
        next(error);
   }
});
router.delete("/delete/:id(\\d+)", async function(req,res,next){
    var postId=req.params.id;
    try {
        var[resultObject,_]=await db.execute(`DELETE FROM posts WHERE id=?;`,[postId]);
        if(resultObject&&resultObject.affectedRows>0){
            req.flash("success","Post was deleted");
            res.json({ success: true, message: 'Post deleted' });
        }else{
            req.flash("error","failed to delete post");
            res.json({ success: false, message: 'Failed to delete post' }); 
            
        }
    } catch (error) {
        next(error);
    }
});
module.exports= router;