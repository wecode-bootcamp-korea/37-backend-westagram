dotenv.config();
// Build-in package
const http = require("http");

// 3rd-party package
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { DataSource } = require("typeorm");

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const myDataSource = new DataSource({
  type : process.env.TYPEORM_CONNECTION,
  host : process.env.TYPEORM_HOST,
  port : process.env.TYPEORM_PORT,
  username : process.env.TYPEORM_USERNAME,
  password : process.env.TYPEORM_PASSWORD,
  database : process.env.TYPEORM_DATABASE
}) 

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  });

app.get('/ping', cors(), function(req, res, next){
  res.json({message : 'pong'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();