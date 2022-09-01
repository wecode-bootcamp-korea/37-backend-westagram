const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config()

const {DataSource} = require('typeorm')

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize() //데이터베이스와 연결을 실행
    .then(() => {
        console.log("Data Source has been initialized!") //datasource가 잘 연결됐다.
    });

app = express()

app.use(express.json());
//app.use(cors());
app.use(morgan('dev'));



