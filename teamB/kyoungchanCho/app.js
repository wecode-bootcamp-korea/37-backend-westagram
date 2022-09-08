require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(route);

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()