var express=require('express');
var router =express.Router();
router.post("/create",function(req,res,next){
    console.log(req);
    res.end();
});


module.exports= router;