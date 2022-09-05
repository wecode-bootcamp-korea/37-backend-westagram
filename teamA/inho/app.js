const dotenv = require("dotenv");
dotenv.config() //환경변수(dotenv)

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const { appendFile } = require("fs");

// const api = require('./../api');

const app = express();

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.use(express.json());  
app.use(cors()); 
app.use(morgan('dev'));

//health check
app.get("/ping", (req, res) => {
    res.status(200).json({ message : "pong"})
});

//create users
app.post("/users", async (req, res, next) => {
    const { name, email, age, password } = req.body

    await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            age,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, age, password]
    );

    res.status(201).json({ message : "userCreated"});
})

//create likes
app.post("/likes", async (req, res) => {
    const { user_id, post_id } = req.body

    await appDataSource.query(
        `INSERT INTO likes(
                user_id,
                post_id
            ) VALUES (?, ?);
            `,
            [user_id, post_id]
    );

    res.status(201).json({ message : "likesCreated"})
})

//create posts
app.post("/posts", async (req, res) => {
    const { title, content, user_id } = req.body

    await appDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [title, content, user_id]
    );

    res.status(201).json({ message : "postsCreated"})
})

//create comments
app.post("/comments", async (req, res) => {
    const { user_id, post_id, content } = req.body

    await appDataSource.query(
        `INSERT INTO comments(
            user_id,
            post_id,
            content
        ) VALUES (?, ?, ?);
        `,
        [ user_id, post_id, content]
    );

    res.status(201).json({ message : "conmmentCreated"})
})

const server = http.createServer(app)
const PORT = process.env.PORT || 3000; 

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start() //start를 발동시키는 명령어