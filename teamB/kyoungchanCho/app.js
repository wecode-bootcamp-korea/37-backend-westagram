require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } =require('typeorm');
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

app.get("/ping", (req, res) => {
    res.json({ message : "pong"})
})

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

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()