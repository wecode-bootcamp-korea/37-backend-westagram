require("dotenv").config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT; 

app.use(express.json()); // 바디에서 받아온 값을 json형태의 객체로 다시 받아올 수 있음!
app.use(morgan('dev'));
app.use(cors());



app.get('/ping', cors(), function(req, res, next){
  res.json({message : 'pong'})
});

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();