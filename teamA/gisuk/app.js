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
});

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

app.get("/user/post/:userId", async (req,res) => {
  const userId = req.params.userId;
  
  const user = await appDataSource.query(
    `SELECT
      users.id as userId,
      users.profile_image as userProfileImage
    FROM users
    WHERE users.id = ${userId};`,
  )
  const post = await appDataSource.query(
    `SELECT
      posts.id as postingId,
      posts.title as postingImageUrl,
      posts.content as postingContent
    FROM posts
    WHERE posts.user_id = ${userId};`,
  )
  user[0].posting = post;
  const result = user[0];
  res.status(200).json({data:result})
})

app.get("/post", async (req,res) => {
    await appDataSource.query(
    `SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.title as postingTitle,
      posts.content as postingContent
    FROM posts INNER JOIN users on posts.user_id = users.id;`,
    (err, rows) => {
      res.status(200).json({data :rows});
  })
})

app.post("/user", async (req, res, next) => {
  const { name, email, profileImage, password} = req.body;
  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);`,
    [ name, email, profileImage, password ]
    );
  res.status(201).json({message : "userCreated"});
})

app.post("/post", async (req, res, next) => {
  const { title, content, userId} = req.body;
  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id
    ) VALUES (?, ?, ?);`,
    [ title, content, userId ]
  );
  res.status(201).json({message : "postCreated"});
})

app.post("/likes/:userId/:postId", async (req, res, next) => {
  const { userId, postId } = req.params;
  await appDataSource.query(
    `INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (${userId}, ${postId});`,
    );
  res.status(201).json({message: "likeCreated"});
})

app.patch("/post/:postId", async (req, res, next) => {
  const postId = req.params.postId;
  const {title, content, userId} = req.body;
  await appDataSource.query(
    `UPDATE posts SET
      title = ?,
      content = ?,
      user_id = ?
    WHERE id = ${postId}`,
    [ title, content, userId ]
  );
  await appDataSource.query(
    `SELECT
      users.id as userId,
      users.name as userName,
      posts.id as postingId,
      posts.title as postingTitle,
      posts.content as postingContent
    FROM posts INNER JOIN users on users.id = posts.user_id where posts.id like ${post_id};`,
    (err, rows) => {
      res.status(200).json({data : rows[0]});
    })
})

app.delete("/post/:postId", async (req, res, next) => {
  const postId = req.params.postId;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId}`);
    res.status(202).json({message : "postingDeleted"});
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start();