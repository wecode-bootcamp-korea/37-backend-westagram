require("dotenv").config();
const http =require("http");
const express = require ("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");


const {DataSource} = require('typeorm');
const { json } = require("express");

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!")
    })
    .catch ((err)=>{
        console.log ('error durig Data Source Initaialization', err)
    database.destroy();
    })  
// 에러가 발생햇을때 뒤의함수를 실행하게 한다.에러가 발생했을때 동작행위를 자세하게 만든다. 서버에러날시 후속조치를 할수있게해준다.)
//catch 는 이경우 initialize 실행시 발생하는 에러에 작동한다.
const app=express()

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get("/ping", (req,res) => {
    res.status(201).json({message : "PONG"});
});

//과제 2번
app.post("/users", async (req, res, next) => {
    const {name, password, email, profile_image} = req.body;

    await database.query(
        `INSERT INTO users (
            name,
            password,
            email,
            profile_image
        ) VALUES (?, ?, ?, ?);
        `,  
        [name, password, email, profile_image]
    )
    res.status(201).json({message : "user created"})
});
//과제3번
app.post("/postsman", async (req, res, next) => {
    const {title, content, user_id} = req.body;

    await database.query(
        `INSERT INTO posts (
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,  
        [title, content, user_id]
    )
    res.status(201).json({message : "postCreated"})
});
//과제 4번
app.get("/postman", async (req, res ) => {

    const user = await database.query(
        `
            SElECT 
            posts.user_id as userId, 
            users.profile_image as userProgileImage, 
            posts.id as postingId, 
            posts.posts_image as postingImageUrl, 
            posts.content as postingContent
            from users join posts on users.id=posts.user_id
        `
    )

    res.status(201).json({data : user})
});

//과제 5번
app.get("/posts/:userId", async (req, res, next) => {
    const userId = req.params.userId;
    
     await database.query(
        `
            SELECT
                users.id as userId,
                users.name as userName
                from users where users.id =${userId}
        `,
            (err, data) => {
                    database.query(
                    `
                        SELECT
                        posts.id as PostingId, 
                        posts.title as PostingName, 
                        posts.content as PostingContent
                        FROM posts
                        where posts.user_id = ${userId}
                    `,(err, posting) => {
                        data[0]["postings"] = posting
                        res.status(200).json({"data":data[0]})
                    }
        )}
    )
});

//6번
app.patch("/updates/:nextPosts", async (req, res, next) => {
    const userId = req.params.nextPosts;
    const {modified} = req.body
    
    await database.query(
        `UPDATE posts
         SET content = ?
         WHERE user_id = ${userId}
        `,
        //? 자리에 업데이트값이 들어간다!!!!!!!!!!!!!!!
        [modified] );
    await database.query(
        `SELECT
        users.id as userId,
        users.name as userName,
        posts.id as PostingId, 
        posts.title as PostingName, 
        posts.content as PostingContent
        FROM users,posts
        WHERE posts.user_id=${userId} 
        `,
        (err, data) => {
            console.log(data);
            res.status(201).json({"data":data[0]})
        }
    )
});



const PORT = process.env.PORT;
const server = http.createServer(app);



//7번
app.delete("/delete/:postId", async (req, res, next) => {
    const postId = req.params.postId;
    
    await database.query(
        `DELETE FROM posts
         WHERE posts.id = ${postId}
        `,
            res.status(201).json({meassage: "postingDeleted"})
    )
});

//8 번
app.post("/post/likes", async (req, res, next) =>{
    const {userid, postid} = req.body;

    await database.query(
        `
            INSERT INTO likes (
                user_id,
                post_id   
            ) VALUES (?, ?);
        `, 
        [userid, postid]
    );
    res.status(201).json({ meassage : "likeCreated"})
});

const start = async() => {
    try{ app.listen(PORT,()=>console.log(`server is listening on ${PORT}`));
    } catch(err) {
        console.log (arr);
    }
}   