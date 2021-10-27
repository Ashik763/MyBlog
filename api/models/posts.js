const PATH = "./data.json";
const fs = require('fs');

// console.log(fs);


class Posts {
    get(){
        //   GET POST  

        return this.readData();
    }
    getIndividualBlog(postId){
        // get one blog post     
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;
    }
    add(newPost){
        // add new post 
        const currentPosts = this.readData();
        // console.log(currentPosts);
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);

    }
    readData(){
        let rawdata = fs.readFileSync(PATH)
        // console.log(rawdata);
        let posts = JSON.parse(rawdata);
        console.log(posts);
        return posts;

    }
    storeData(rawData){
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH,data);

    }
}
module.exports = Posts;