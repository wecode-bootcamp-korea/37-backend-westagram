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
     console.log("Error during Data Source initialization", err);
      appDataSource.destroy()
  });

app.get('/ping', function(req, res, next){
  res.json({message : 'pong'})
});

app.get('/lookup', async (req, res) =>{
    const user = await appDataSource.manager.query(
      `SELECT 
        users.id, 
        users.profileImage, 
        posts.id, posts.user_id, 
        posts.title, posts.content 
      FROM users, posts
      WHERE users.id = posts.user_id`
    )
    res.status(200).json({data : user})
  });

  app.get('/userInfo/:userid', async(req, res) =>{
    const userId = req.params.userid;
    const result = {};
    const postingList = [];

    const rows = await appDataSource.manager.query(`
        SELECT 
            users.id as userId, 
            users.profileImage as userProfileImage, 
            posts.id as postingId, 
            posts.title, 
            posts.content 
        FROM users inner join posts on users.id = posts.user_id and users.id = ${userId}`
    )
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
  });
  
  app.post("/users", async(req, res, next) => {
    const { name, email, profileImage, password} = req.body;
    const rows = await appDataSource.manager.query(
      `SELECT *
      FROM users
      WHERE users.email = "${email}"`
    )
    if(Object.keys(rows).length == 0){
      await appDataSource.query(`INSERT INTO users(
        name, 
        email, 
        profileImage, 
        password
        )values(?, ?, ?, ?);`,
      [name, email, profileImage, password]
    );
    res.status(201).json({"message" : "userCreated"});
    }
    else 
    res.status(202).json({"message" : "fail"});

  });

  app.post("/posts", async(req, res, next) => {
    const { title, content, user_id } = req.body;
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

  app.post("/likes/:userId", async(req, res, next) => {
    userId = req.params.userId;
    const { postId } = req.body;

    await appDataSource.query(`
      INSERT INTO likes(
        user_id, 
        post_id
        )values(${userId}, ${postId});`, 
    );
    res.status(201).json({"message" : "likeCreated"});
  });

  app.patch("/editPost/:postid", async(req, res, next) => { // next의 역할은 무엇인가?
    const postId = req.params.postid;
    const { title, content } = req.body;

    await appDataSource.query(`
      UPDATE posts 
        SET title = ?, 
        content = ? 
      WHERE id = ${postId};`,
      [title, content]
    );
    const posts = await appDataSource.manager.query(`
      SELECT * 
      FROM posts
      WHERE id = ${postId};`
   );
   res.status(200).json({"data" : posts[0]});
 });

 app.delete('/delPost/:postid', async(req, res) =>{
    const postId = req.params.postid; 

    await appDataSource.manager.query(`
      DELETE FROM posts
      WHERE id = ${postId};`
    );
    res.status(203).json({"message" : "postingDeleted"});
  });
  

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();