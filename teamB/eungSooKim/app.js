require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require("typeorm");

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
  const { name, email, password } = req.body;

  await database.query(
    `INSERT INTO users(
            name,
            email,
            password
        ) VALUES (?, ?, ?);
        `,
    [name, email, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/posts/:userID", async (req, res) => {
  const { title, content } = req.body;
  const userID = req.params.userID;

  await database.query(
    `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ${userID});
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
                posts.profile_image AS potingImageUrl,
                posts.content As postingContent
         FROM users JOIN posts ON users.id = posts.user_id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.get("/userpost/:userID", async (req, res) => {
  const userID = req.params.userID;
  await database.query(
    `SELECT users.id AS userId,
                users.profile_image AS userProfileId,
                posts.id AS postingId, posts.title AS postingTitle,
                posts.content AS postingContent
         From posts JOIN users ON users.id = ${userID} AND users.id = posts.user_id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.put("/post/:postID", async (req, res) => {
  const { postingTitle, postingContent } = req.body;
  const postID = req.params.postID;
  await database.query(
    `UPDATE posts
         SET title = ?,
             content = ?
         WHERE posts.id= ${postID}
        `,
    [postingTitle, postingContent]
  );

  await database.query(
    `SELECT users.id AS userId,
                users.name AS userName,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
         FROM users JOIN posts ON posts.user_id = users.id AND posts.id = ${postID}`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.delete("/del/:postID", async (req, res) => {
  const postID = req.params.postID;
  await database.query(
    `DELETE FROM posts
         WHERE posts.id = ${postID}`
  );
  res.status(200).json({ message: "postingDeleted" });
});

app.post("/like/:userID", async (req, res) => {
  const { postID } = req.body;
  const userID = req.params.userID;

  await database.query(
    `INSERT INTO likes(
            post_id,
            user_id
        ) VALUES (?, ${userID});
        `,
    [postID]
  );
  res.status(201).json({ message: "likeCreated" });
});

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
