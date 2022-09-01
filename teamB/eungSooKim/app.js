require('dotenv').config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require('typeorm');

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    });


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
const server = http.createServer(app)
const PORT = process.env.PORT;


app.get("/ping", (req, res) => {
    res.json({ message : "pong"});
    })

app.post("/users", async (req, res, next) => {
    const { name, email, password } = req.body
   
    await database.query(
        `INSERT INTO users(
            name,
            email,
            password
        ) VALUES (?, ?, ?);
        `,
        [ name, email, password ]
    ); 
     res.status(201).json({ message : "userCreated" });
    })

app.post("/posts", async (req, res, next) => {
    const { title, content, user_id } = req.body

    await database.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, user_id ]
    );
        res.status(201).json({ message : "postCreated"});
    })

app.get("/posts", async (req, res, next) => {
     
    await database.query(
        `SELECT posts.user_id AS userId,
                users.profile_image AS userProfileImage,
                posts.id AS postingId,
                posts.profile_image AS potingImageUrl,
                posts.content As postingContent
        FROM users JOIN posts ON users.id = posts.user_id`
    ,(err, rows)=>{
        res.status(200).json(rows);
        });
    })

app.get('/userpost/:userID', async(req, res) => {
    const { userID } = req.params
    await database.query(
	    `SELECT users.id AS userId,
                users.profile_image AS userProfileId,
                posts.id AS postingId, posts.title AS postingTitle,
                posts.content AS postingContent
        From posts JOIN users ON users.id = ${userID} AND users.id = posts.user_id`
    ,(err, rows) => {
        res.status(200).json(rows);
    	});
    })


const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()