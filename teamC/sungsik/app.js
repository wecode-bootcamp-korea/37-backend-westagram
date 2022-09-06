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

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);

app.get('/ping', (req, res) => {
    res.status(200).json({ message:'pong' })
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async() => {
    try {  
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
}

start();