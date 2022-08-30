const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config() // 환경변수에 적어둔 것을 app.js에서 활용 가능한위에놓자
const { DataSource } = require('typeorm');

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
    });

app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
const server = http.createServer(app)
const PORT = process.env.PORT;

//health check
app.get("/ping", (req, res) => {
    res.json({ message : "pong"});
})



const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()