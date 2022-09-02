// dotenv
require("dotenv").config()

// Built-in package
const http = require("http");

// 3rd-party package
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require("typeorm")

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
    })

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));


// connection check
app.get('/ping', (req, res) => {
    res.status(200).json({ message:'pong' })
})


//create users
app.post('/users', async (req, res, next) => {
    const { name, email, profile_image, password } = req.body
    
    const check = await database.query(
        `SELECT email FROM users WHERE users.email = ?`
        ,email
    )
    
    if (check.length === 0) {
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
        res.status(200).json({ message:'userCreated'})
    } else {
        if (check[0].email === email) {
            res.status(409).json({ message:'userOverlaped'})
        } else {
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
            res.status(200).json({ message:'userCreated'})
        }
    }
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

start();