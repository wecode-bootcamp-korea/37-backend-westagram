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
    


const PORT = process.env.PORT;
const server = http.createServer(app);


const start = async() => {
    try{ app.listen(PORT,()=>console.log(`server is listening on ${`PORT`}`));
    } catch(err) {
        console.log (arr);
    }
}   

start()