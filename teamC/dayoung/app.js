require("dotenv").config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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

app.get('/ping', cors(), function(req, res, next){
  res.json({message : 'pong'})
})

app.get('/lookup', async(req, res) =>{
  await appDataSource.manager.query(
    `SELECT 
    users.id, users.profile_image, posts.id, posts.user_id, posts.title, posts.content 
    FROM users, posts
    WHERE users.id = posts.user_id`
    ,(err, rows) => {
      res.status(200).json({"data" : rows});
    }
  )
});

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();