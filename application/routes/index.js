var express = require('express');
var router = express.Router();
var{isLoggedIn,isMyProfile}=require("../middleware/auth");
const { getRecentPosts } = require('../middleware/posts');
/* GET home page. */
router.get('/',getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', pageTitle: 'CSC 317 Website',name:"Luis Alvarado Rivas" });
});


router.get("/login",function(req,res){
  res.render('login',{pageTitle: 'Login'});
});
router.get("/postvideo",isLoggedIn,function(req,res){
  res.render('postvideo',{pageTitle: 'Upload Video'});
});
router.get("/profile",function(req,res){
  res.render('profile',{pageTitle: 'Profile'});
});
router.get("/registration",function(req,res){
  res.render('registration',{pageTitle: 'Register'});
});


module.exports = router;
