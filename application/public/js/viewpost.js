
        document.getElementById('comment-button').addEventListener('click',function(ev){
            let commentText =document.getElementById("comment-text").value;
            if(!commentText)return;
            var postId=ev.currentTarget.dataset.postid;
            console.log(commentText);
            fetch("/comments/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    postId:postId,
                    comment:commentText
                })
            })
           .then(response=>response.json())
            .then(data=>{console.log(data);
            var comments= document.getElementById("comments");
            let commentFragment=document.createElement('template');
            commentFragment.innerHTML=` <div class="comment-post">
            <div>
                <img id="photo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"width="100px" height="100px" alt="">
                <a href="profile">${data.username}</a>
                <span>${(new Date()).toLocaleString("en-us",{dateStyle:"long",timeStyle:"medium"})}</span>
            </div>
            <p>
                ${data.commentText}
            </p>
        </div>`;
        comments.append(commentFragment.content);
            })
            .catch(error => {
                window.location.href = '/postvideo'
                // Handle errors here
              });
        });
        
