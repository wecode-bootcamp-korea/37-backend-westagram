// require(“dotenv”).config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(morgan('dev'));

dotenv.config();

app.get('/ping', cors(), function(req, res, next){
  res.json({message : 'pong'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();