var express = require('express');
var router = express.Router();
var{isLoggedIn,isMyProfile}=require("../middleware/auth");
/* GET home page. */
router.get('/', function(req, res, next) {
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
router.get('/viewpost/:id(\\d+)',function(req,res){
  res.render('viewpost',{pageTitle:"",js:["viewpost.js"]});
});

module.exports = router;
