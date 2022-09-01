require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource, Connection } =require('typeorm');
const { restart } = require('nodemon');

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

//health check
app.get("/ping", (req, res) => {
    res.json({ message : "pong"})
})

//윺저 회원 등록
app.post("/users", async (req, res, next) => {
    const { name, email, profile_image, password } = req.body

    await database.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, profile_image, password ]
    );
    res.status(201).json({ message : "userCreated" })
})

//게시글 유저아이디 별 등록
app.post("/posts/:user_id", async (req, res, next) => {
    const { title, content, user_id } = req.body
    const userid = req.params.user_id;

    await database.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, user_id ]
    );
    res.status(201).json({ message : "postCreated"})
})

//전체 게시글 조회
app.get("/posts", (req, res) =>{
    database.query(
        `select 
            users.id as userId,
            users.profile_image as usersProfileImage,
            posts.id as postingId,
            posts.title as postingTitle,
            posts.content as postingContent
        from posts join users on posts.user_id = users.id;
        `,(err, rows) => {
            if(err){
                console.log("Error : Could not load data from data source.");
            } else {
                res.status(200).json({ "data" : rows})

            }
        }
    );
})


const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()