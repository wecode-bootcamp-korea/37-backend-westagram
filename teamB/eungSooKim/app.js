require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require('typeorm');


const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});


database
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
const server = http.createServer(app);
const PORT = process.env.PORT;

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


app.post("/users", async (req, res) => {
  const { name, email, passWord } = req.body;

  await database.query(
    `INSERT INTO users(
            name,
            email,
            password
        ) VALUES (?, ?, ?);
        `,
    [name, email, passWord]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/posts/:userId", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.params.userId;

  await database.query(
    `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ${userId});
        `,
    [title, content]
  );
  res.status(201).json({ message: "postCreated" });
});

app.get("/posts", async (req, res) => {
  await database.query(
    `SELECT posts.user_id AS userId,
                users.profile_image AS userProfileImage,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.profile_image AS potingImageUrl,
                posts.content As postingContent
         FROM users JOIN posts ON users.id = posts.user_id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});


app.get("/users/userPosting/:userId", async (req, res) => {
  let userId = req.params.userId;
  const result = {};

  await database.query(
    `SELECT users.id AS userId,
            users.profile_image AS userProfileId
         FROM users WHERE users.id = ${userId}`,
    (err, rows) => {
      result.userId = rows[0].userId
      result.userProfileId = rows[0].userProfileId;
      database.query(
        `SELECT posts.id AS postingID, 
        posts.profile_image AS postingImageUrl, 
        posts.title AS postingContent FROM posts 
        WHERE ${userId} = posts.user_id`,
        (err, postInfo) => {
          result.postings = postInfo
          res.status(200).json({data:result});
        }
      );
    }
  );
});

app.put("/posts/modify/:postId", async(req, res) => {
  const { postingTitle, postingContent } = req.body;
  const postId = req.params.postId;

  await database.query(
    `UPDATE posts
         SET title = ?,
             content = ?
         WHERE posts.id= ${postId}
        `,
    [postingTitle, postingContent]
  );

  await database.query(
    `SELECT users.id AS userId,
                users.name AS userName,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
         FROM users JOIN posts ON posts.user_id = users.id AND posts.id = ${postId}`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.delete("/posts/delete/:postId", async (req, res) => {
  const postId = req.params.postId;

  await database.query(
    `DELETE FROM posts
         WHERE posts.id = ${postId}`
  );
  res.status(200).json({ message: "postingDeleted" });
});

app.post("/likes/:userId", async (req, res) => {
  const { postId } = req.body;
  const userId = req.params.userId;

  await database.query(
    `INSERT INTO likes(
            post_id,
            user_id
        ) VALUES (?, ${userId});
        `,
    [postId]
  );
  res.status(201).json({ message: "likeCreated" });
});

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
