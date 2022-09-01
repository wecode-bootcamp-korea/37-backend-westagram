require("dotenv").config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");
const app = express();

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
  .catch((err) =>{
     console.err("Error during Data Source initialization", err);
      appDataSource.destroy()
  });

app.get('/ping', function(req, res, next){
  res.json({message : 'pong'})
});


app.get('/lookup', async(req, res) =>{
    await appDataSource.manager.query(
      `SELECT 
        users.id, 
        users.profile_image, 
        posts.id, posts.user_id, 
        posts.title, posts.content 
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
    await appDataSource.manager.query(`
        SELECT 
            users.id as userId, 
            users.profile_image as userProfileImage, 
            posts.id as postingId, 
            posts.title, 
            posts.content 
        FROM users inner join posts on users.id = posts.user_id and users.id = ${userId}`
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
    await appDataSource.query(`INSERT INTO users(
        name, 
        email, 
        profile_image, 
        password
        )values(?, ?, ?, ?);`,
      [name, email, profile_image, password]
    );
    res.status(201).json({"message" : "userCreated"});
  });

  app.post("/posts", async(req, res, next) => {
    const {title, content, user_id} = req.body;
    await appDataSource.query(`
      INSERT INTO posts(
        title, 
        content, 
        user_id
        )values(?, ?, ?);`,
      [title, content, user_id]
    );
    res.status(201).json({"message" : "postCreated"});
  });

  app.post("/likes/:user_id", async(req, res, next) => {
    userId = req.params.user_id;
    const {post_id} = req.body;
    await appDataSource.query(`
      INSERT INTO likes(
        user_id, 
        post_id
        )values(${userId}, ?);`,
      [post_id]
    );
    res.status(201).json({"message" : "likeCreated"});
  });

  app.patch("/editPost/:post_id", async(req, res, next) => { // next의 역할은 무엇인가?
    const postId = req.params.post_id;
    const {title, content} = req.body;
    await appDataSource.query(`
      UPDATE posts 
        SET title = ?, 
        content = ? 
      WHERE id = ${postId};`,
      [title, content]
    );
    await myDataSource.manager.query(
     `SELECT * 
     FROM posts
     WHERE id = ${postId}`
     ,(err, rows) => {
       res.status(200).json({"data" : rows});s
     }
   );
 });

 app.delete('/delPost/:post_id', async(req, res) =>{
    const postId = req.params.post_id;
    await myDataSource.manager.query(`
      DELETE FROM posts
      WHERE id = ${postId}`
    );
    res.status(203).json({"message" : "postingDeleted"});
  });
  

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();