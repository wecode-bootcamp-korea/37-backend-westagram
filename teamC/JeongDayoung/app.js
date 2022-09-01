require("dotenv").config();// env를 불러오는 함수임으로 port 선언 전에 들어와야 한다!

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { DataSource } = require("typeorm");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const appDataSource = new DataSource({
  type : process.env.TYPEORM_CONNECTION,
  host : process.env.TYPEORM_HOST,
  port : process.env.TYPEORM_PORT,
  username : process.env.TYPEORM_USERNAME,
  password : process.env.TYPEORM_PASSWORD,
  database : process.env.TYPEORM_DATABASE
}) 

appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });

app.get('/ping', function(req, res, next){
  res.json({message : 'pong'})
})

app.post("/users", async(req, res, next) => {
  const {name, email, profile_image, password} = req.body; 
  
  await appDataSource.query(
    `INSERT INTO users(
      name, 
      email, 
      profile_image, 
      password
      )values(?, ?, ?, ?);`,
    [name, email, profile_image, password]
  );
  res.status(201).json({"message" : "userCreated"});
})

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();