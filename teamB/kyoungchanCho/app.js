require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
// const { DataSource } =require('typeorm');

// const database = new DataSource({
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE
// })

app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

// database.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(route);

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()