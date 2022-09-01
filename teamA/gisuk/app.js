require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const app = express();
const PORT = process.env.PORT;

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
      appDataSource.destroy()
    })

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/ping", (req,res) => {
  res.status(200).json({"message" : "pong"});
})

app.get("/user", async (req,res) => {
  await appDataSource.query(
    `SELECT 
    users.name,
    users.email,
    users.profile_image
    FROM users`,
    (err, rows) => {
      res.status(200).json(rows);
    })
});

app.get("/user/post/:user_id", async (req,res) => {
  const user_id = req.params.user_id;
  await appDataSource.query(
    `select 
    users.id as userId,
    users.profile_image as userProfileImage,
    posts.id as postingId,
    posts.title as postingTitle,
    posts.content as postingContent 
    from posts inner join users on posts.user_id = users.id 
    where users.id like ${user_id};`,
    (err, rows) => {
      const posting = [];
      rows.map((el) => {
        posting.push({
          postingId : user_id, 
          postingTitle : el.postingTitle, 
          postingContent : el.postingContent
        })
      })
    result = {
      userId : user_id, 
      userProfileImage : rows[0].userProfileImage, 
      postings : posting
    }
    res.status(200).json({data : result});
    }
  )
})

app.get("/post", async (req,res) => {
    await appDataSource.query(
    `select
    users.id as userId,
    users.profile_image as userProfileImage,
    posts.id as postingId,
    posts.title as postingTitle,
    posts.content as postingContent
    from posts inner join users on posts.user_id = users.id;`,
    (err, rows) => {
      res.status(200).json({data :rows});
  })
})

app.post("/user", async (req, res, next) => {
  const { name, email, profile_image, password} = req.body;
  await appDataSource.query(
    `INSERT INTO users(
    name,
    email,
    profile_image,
    password
    ) VALUES (?, ?, ?, ?);`,
    [ name, email, profile_image, password ]
    );
  res.status(201).json({message : "userCreated"});
})

app.post("/post", async (req, res, next) => {
  const { title, content, user_id} = req.body;
  await appDataSource.query(
    `INSERT INTO posts(
    title,
    content,
    user_id
    ) VALUES (?, ?, ?);`,
    [ title, content, user_id ]
  );
  res.status(201).json({message : "postCreated"});
})

app.post("/likes/:user_id", async (req, res, next) => {
  const user_id = req.params.user_id;
  const {post_id} = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
      user_id,
      post_id
      ) VALUES (${user_id}, ?);`,
      [ post_id ]
  );
  res.status(201).json({message: "likeCreated"});
})

app.patch("/post/:post_id", async (req, res, next) => {
  const post_id = req.params.post_id;
  const {title, content, user_id} = req.body;
  await appDataSource.query(
    `UPDATE posts SET
    title = ?,
    content = ?,
    user_id = ?
    WHERE id = ${post_id}`,
    [ title, content, user_id ]
  );
  await appDataSource.query(
    `SELECT
    users.id as userId,
    users.name as userName,
    posts.id as postingId,
    posts.title as postingTitle,
    posts.content as postingContent
    from posts inner join users on users.id = posts.user_id where posts.id like ${post_id};`,
    (err, rows) => {
      res.status(200).json({data : rows[0]});
    })
})

app.delete("/post/:post_id", async (req, res, next) => {
  const post_id = req.params.post_id;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${post_id}`);
    res.status(200).json({message : "postingDeleted"});
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
} 

start();