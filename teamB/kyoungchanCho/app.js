require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");

app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(route);

//app.all('*,~) http요청이 없을 경우 all 안에 콜백함수 실행
//() 있고 없고 차이

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()