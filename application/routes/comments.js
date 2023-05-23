var express=require('express');
var db =require('../conf/database');
var router =express.Router();
const { isLoggedIn } = require('../middleware/auth');
router.post('/create',isLoggedIn, async function(req,res,next){
    var {userId,username}=req.session.user;
    var{postId,comment}=req.body;
    try {
        var[insertResult,_]=await db.execute(`INSERT INTO comments (text,fk_postId,fk_authorId) VALUE (?,?,?)`,[comment,postId,userId]);
        if(insertResult&&insertResult.affectedRows==1){
            return res.status(201).json({
                commentId:insertResult.insertId,
                username:username,
                commentText:comment,
            });

        }else{
            req.flash("error","Comments could not be created");
            return req.session.save(function(error){
                if(error){next(error)};
            });
        }
    } catch (error) {
        next(error);
    }
});
module.exports= router;