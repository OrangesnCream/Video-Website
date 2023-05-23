var pathToFFMPEG =require('ffmpeg-static');
var exec =require('child_process').exec;
var db =require('../conf/database');
module.exports={
    makeThumbnail: function(req,res,next) {
        if(!req.file){
            next(new Error('File upload failed'));
        }else{
            try {
                var destinationOfThumbnail=`public/images/uploads/thumbnail-${req.file.filename.split(".")[0]}.png`;
            var thumbnailCommand= `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
            exec(thumbnailCommand);
            req.file.thumbnail=destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
            
        }
    },
    //implement these yourself
    getPostsForUserBy: function(req,res,next) {},
    getPostById:async function (req,res,next) {
        var{id}= req.params;
        try {
            let[rows,_]= await db.execute(
                `select u.username, p.video, p.title,p.createdAT, p.description, p.id from posts p JOIN users u on p.fk_userId=u.id where p.id=?;`,
                [id]
            );
            const post= rows[0];
            if(!post){
                req.flash("error",`Post does not exist`);
            req.session.save(function(err){
                if(err) next(err);
                res.redirect('/');

            });

            }else{
                res.locals.currentPost=post;
                next();
            }
        } catch (error) {
            next(error);
        }
    
    },
    getCommentsForPostsById:async function (req,res,next) {
        var{id}= req.params;
        try {
            let[rows,_]= await db.execute(
                `select u.username, c.text, c.createdAT from comments c JOIN users u on c.fk_authorId=u.id where c.fk_postId=?;`,
                [id]
            );
                res.locals.currentPost.comments=rows;
                next();
        } catch (error) {
            next(error);
        }
    },
    getRecentPosts:async function (req,res,next) {
        try {
            var[rows,_]=await db.execute(
                `select id,title,thumbnail FROM posts ORDER BY createdAT DESC limit 10;`
            );
            if(rows&&rows.length==0){
    
            }else{
                res.locals.posts=rows;
                res.render('index');
    
            }//add later
        } catch (error) {
            next(error);
       }
    },
    
}