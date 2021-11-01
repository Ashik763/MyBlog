const express = require('express');
const app = express();
const Post = require("./api/models/posts.js");
const postsData = new Post(); 
var cors = require('cors')
app.use(cors());
var multer = require('multer')
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')

    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})


const getExt = (mimeType) => {
    switch (mimeType) {
        case "image/png":
            return ".png";
           
        case "image/jpeg":
            return ".jpeg";    
    }
}


var upload = multer({storage:storage})


app.use(express.json());
// console.log(typeof Post);

// const posts = [{
//     "id": "1581461442206",
//     "title": "This is a New Blog Post",
//     "content": "This is the content! ",
//     "post_image": "uploads/post-image-1581461442199.jpg",
//     "added_date": "1581461442206"
// }]
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
// })
app.use('/uploads',express.static('uploads'));

app.get("/",(req,res) =>{
    console.log(postsData.get());
    
    res.send(postsData.get());
});
app.get("/api/posts",(req,res) =>{
    // const test = {
    //     testing: "abar dekhi"
    // }
    // postsData.add(); 
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

app.post("/api/posts",upload.single("post-image") ,(req,res) =>{
    // console.log(req.body);
    // console.log(req.file);
    console.log(req.file);
    console.log(req.file.path);
    // res.send("ok");
    const newPost = {
        "id" : `${Date.now()}`,
        "title" : req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date" : `${Date.now()}`

    }
    console.log(newPost);
    postsData.add(newPost);
    res.status(201).send("ok");
})



app.listen(3000,() => {
    console.log("listening");
})