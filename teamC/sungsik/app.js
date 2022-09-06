// dotenv
require("dotenv").config()

// Built-in package
const http = require("http");

// 3rd-party package
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// router
const routes = require("./routes")
const asyncWrap = require('./errorHandler/asyncWrap')

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);
app.use((err, req, res, next) => {
    if (err.statusCode === 400) {
        res.status(400).json({ message:'Please input data correctly'})
    }
    res.statuc(500).json({ message:'INTERNAL_SERVER_ERROR'})
})


app.get('/ping', (req, res) => {
    res.status(200).json({ message:'pong' })
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = asyncWrap.asyncWrap(async() => {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
})

start();