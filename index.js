const express = require('express');
const app = express();
const Post = require("./api/models/posts.js");
const postsData = new Post(); 
// console.log(typeof Post);

// const posts = [{
//     "id": "1581461442206",
//     "title": "This is a New Blog Post",
//     "content": "This is the content! ",
//     "post_image": "uploads/post-image-1581461442199.jpg",
//     "added_date": "1581461442206"
// }]

app.get("/api/posts",(req,res) =>{
    const test = {
        testing: "abar dekhi"
    }
    postsData.add(test); 
    res.send(postsData.get());
});

app.get("/api/posts/:post_id",(req,res) =>{
    const postId = req.params.post_id;
    console.log(postId);
    const foundPost = postsData.getIndividualBlog(postId);
    if(foundPost){
        res.status(200).send(foundPost);
    }
    else{
        res.status(404).send("Not Found")
    }
})



app.listen(3000,() => {
    console.log("listening");
})