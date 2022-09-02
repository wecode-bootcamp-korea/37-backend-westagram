const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { appendFile } = require("fs");
const { DataSource } = require("typeorm");

dotenv.config() //환경변수(dotenv)


const app = express()

// const myDataSource = new DataSource({
//     type: 'mysql',
//     host: '127.0.0.1',
//     port: '3306',
//     username: 'root',
//     password: '',
//     database: 'express',
// })  이렇게하면 보안에 취약함, 변수로 넣어줘야한다.

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.use(express.json());  //app.use는 middleware를 추가하는 함수, middleware는 요청과 응답 중간중간에 실행해야하는 함수(응답마지막에 보내는 것(response)도 포함)
app.use(cors()); //서버연결, cors라는 미들웨어를 app.use를 통해 추가함.
app.use(morgan('dev'));

app.get("/ping", (req, res) => {
    res.json({ message : "pong"})
});

const server = http.createServer(app)
const PORT = process.env.PORT || 3000; //컴퓨터에 있는 환경변수의 PORT를 가져오거나 그게 없으면 3000으로한다.

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start() //start를 발동시키는 명령어