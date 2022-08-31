const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { DataSource } = require("typeorm");
const { userInfo } = require("os");
const app = express();
const server = http.createServer(app);
dotenv.config(); // env를 불러오는 함수임으로 port 선언 전에 들어와야 한다!
const PORT = process.env.PORT;

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
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    });

app.get('/ping', cors(), function(req, res, next){
  res.json({message : 'pong'})
})

app.get('/lookup', async(req, res) =>{
  await myDataSource.manager.query(
    `SELECT 
    users.id, users.profile_image, posts.id, posts.user_id, posts.title, posts.content 
    FROM users, posts
    WHERE users.id = posts.user_id`
    ,(err, rows) => {
      res.status(200).json({"data" : rows});
    }
  )
});

app.get('/userInfo/:user_id', async(req, res) =>{
  const userId = req.params.user_id;
  const result = {};
  const postingList = [];
  await myDataSource.manager.query(
    `select users.id as userId, users.profile_image as userProfileImage, posts.id as postingId, posts.title, posts.
    content from users inner join posts on users.id = posts.user_id and users.id = ${userId}`
    ,(err, rows) => {
       result.usersId = rows[0].userId;
       result.useProfileImage = rows[0].userProfileImage;
       rows.map(el =>{
        let tmp = {};
        tmp.postingId = el.postingId;
        tmp.content = el.content;
        tmp.title = el.title;
        postingList.push(tmp);
       })
       result.postings = postingList;
      res.status(200).json({"data" : result});
    }
  )
});

app.post("/users", async(req, res, next) => {
  const {name, email, profile_image, password} = req.body;
  await myDataSource.query(
    `INSERT INTO users(name, email, profile_image, password)
    values(?, ?, ?, ?);`,
    [name, email, profile_image, password]
  );
  res.status(201).json({"message" : "userCreated"});
})

app.post("/posts", async(req, res, next) => {
  const {title, content, user_id} = req.body;
  await myDataSource.query(
    `INSERT INTO posts(title, content, user_id)
    values(?, ?, ?);`,
    [title, content, user_id]
  );
  res.status(201).json({"message" : "postCreated"});
})




const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();