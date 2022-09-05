require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource, Connection } =require('typeorm');
// const { restart } = require('nodemon');
// const { application } = require('express');
// const { ppid } = require('process');

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//app.use(routes);
//console.log(http)

//health check
app.get("/ping", (req, res) => {
    res.json({ message : "pong"})
})

//유저 회원 등록
app.post("/users/signup", async (req, res, next) => {
    const { name, email, profileImage, password } = req.body

    await database.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, profileImage, password ]
    );
    res.status(201).json({ message : "userCreated" })
})

//게시글 유저아이디 별 등록
app.post("/posts", async (req, res, next) => {
    const { title, content, userId } = req.body

    await database.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, userId ]
    );
    res.status(201).json({ message : "postCreated"})
})

//전체 게시글 조회
app.get("/posts", async (req, res) =>{

    await database.query(
        `SELECT 
            users.id AS userId,
            users.profile_image AS usersProfileImage,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts JOIN users ON posts.user_id = users.id;
        `,(err, rows) => {
            if(err){
                console.log("Error : Could not load data from data source.");
            } else {
                res.status(200).json({ "data" : rows})

            }
        }
    );
})

//한 유저의 게시글 조회
app.get('/posts/:userId', async (req, res) =>{
    const userId = req.params.userId;

    await database.query(
        `SELECT
            users.id AS userId,
            users.profile_image AS userProfileImage
        FROM users
        where users.id = ${userId}
        `,
        (err, data) => {
            database.query(
                `SELECT
                    posts.id AS postingId,
                    posts.content AS postingContent,
                    posts.title AS postsTitle
                FROM posts
                WHERE posts.user_id = ${userId}                   
                `,(err, postingsInfo) => {
                    if(err) {
                        console.log("Error : Could not load data from data source.");
                    } else {
                        data[0]["positngs"] = postingsInfo           
                        res.status(200).json({"data":data[0]})
                    }
                }
            )
        }        
    )
})

//게시글 수정하기
app.patch('/posts/:postId', async (req, res) => {
    const postId = req.params.postId
    const { title } = req.body 

    await database.query(
        `UPDATE posts SET
            posts.title = ?
        WHERE posts.id = ${postId}
        `,
        [ title ]
    );
    database.query(
        `SELECT
            users.id AS userId,
            users.name AS userName,
            posts.id AS postingId,
            posts.title AS postingTItle,
            posts.content AS postingContent
        FROM users 
        JOIN posts ON posts.user_id = users.id
        WHERE posts.id = ${postId}
        `,(err, rows) => {
            if(err) {
                console.log("Error : Could not corrected data from data source.");
            } else {
            res.status(201).json({"data" : rows[0]})
            }
        }
    )
})

//게시글 삭제하기
app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId

    await database.query(
        `DELETE
        FROM posts
        WHERE posts.id = ${postId}
        `)
        res.status(200).json({ message : "postingDeleted"})
}) 

//좋아요 누르기
app.post('/posts/likesdata', async (req, res) => {
    const { userId, postId } = req.body

    await database.query(
        `INSERT INTO likes (
            user_id,
            post_id
        ) VALUES ( ?, ? );   
        `,
        [ userId, postId ]
    );
        res.status(201).json({ message : "likeCreated"})    
})

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()