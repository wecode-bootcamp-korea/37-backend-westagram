require("dotenv").config()

const http = require("http");

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const { DataSource } = require('typeorm')

const mysqlDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

mysqlDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/ping", (req, res) => {
  res.status(200).json({ message : "pong" });
})

// 전체 게시글 조회하기
app.get("/posts", async (req, res) => {
  await mysqlDataSource.query(
    `SELECT
        usersWesta.id as userId,
        usersWesta.profile_image as userProfileImage,
        postsWesta.id as postingId,
        postsWesta.title as postingTitle,
        postsWesta.content as postingContent
      FROM usersWesta
      INNER JOIN postsWesta
      ON postsWesta.user_id = usersWesta.id
      `
    ,(err, rows) => {
        res.status(200).json(rows);
      })
});

// 유저의 게시글 조회하기
app.get("/posts/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  const userInfo = await mysqlDataSource.query(
    `SELECT
        usersWesta.id as userId,
        usersWesta.profile_image
      FROM usersWesta
      WHERE id = ${userId};
    `);
    
    const posting = await mysqlDataSource.query(
      `SELECT
        postsWesta.id as postingId,
        postsWesta.title as postingTitle,
        postsWesta.content as postingContent
      FROM postsWesta
      INNER JOIN usersWesta
      ON usersWesta.id = postsWesta.user_id
      `
    );
      userInfo[0].postings = posting;
      res.status(200).json({ "data" : userInfo[0] });
    });

// 유저 회원가입 하기
app.post("/signup", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body
  await mysqlDataSource.query(
    `INSERT INTO usersWesta(
      name,
      email,
      profile_image,
      password
    )
    VALUES (?, ?, ?, ?)
    `,
    [ name, email, profileImage, password ]
  );
  res.status(201).json({ message : "Successfully created" });
})

// 게시물 등록하기
app.post("/postup", async (req, res) => {
  const { title, content, userId } = req.body
  await mysqlDataSource.query(
    `INSERT INTO postsWesta(
      title,
      content,
      user_id
    )
    VALUES (?, ?, ?);
    `,
    [ title, content, userId ]
  );

  res.status(201).json({ message : "postCreated" });
})

// 좋아요 누르기
app.post("/like", async (req, res) => {
  const { userId, postId } = req.body
  await mysqlDataSource.query(
    `INSERT INTO likesWesta(
      user_id,
      post_id
    )
    VALUES (?, ?);
    `,
    [ userId, postId ]
  );
  
  res.status(201).json({ message : "likeCreated" })
})

// 게시글 수정하기
app.patch("/postsmodify/:postId", async (req, res, next) => {
  const postId = req.params.postId
  const { title, content } = req.body

  await mysqlDataSource.query(
    `UPDATE postsWesta
    SET
      title = ?,
      content = ?
    WHERE
      id = ${postId}
    `,
    [ title, content ]
  );

  await mysqlDataSource.query(
    `SELECT
      usersWesta.id as userId,
      usersWesta.name as userName,
      postsWesta.id as postingId,
      postsWesta.title as postingTitle,
      postsWesta.content as postingContent
    FROM usersWesta
    INNER JOIN postsWesta
    ON usersWesta.id = postsWesta.user_id
    WHERE postsWesta.id = ${postId};
    `
    ,(err, rows) => {
      res.status(200).json({ "data" : rows});
    })
});

// 게시글 삭제하기
app.delete("/postdel/:postId", async(req, res) => {
  const { postId } = req.params;
  await mysqlDataSource.query(
    `DELETE FROM postsWesta
    WHERE postsWesta.id = ${postId}
    `);
    res.status(200).json({ message : "successfully deleted" });
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
} catch (err) {
  console.error(err);
}
}

start()