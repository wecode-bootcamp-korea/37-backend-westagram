require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource, TypeORMError } = require('typeorm');

const app = express();
const PORT = process.env.PORT

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
  });

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  //health check
  app.get("/ping", (req,res) => {
    res.status(200).json({"message" : "pong"});
  })
 //assignment 2 유저회원가입
  app.post("/users", async (req, res, next) => {
    const { name, email, profile_image, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [ name, email, profile_image, password ]
  );

      res.status(201).json({ "message" : "userCreated"});
  })
//assignment 3 게시글 등록하기
  app.post("/posts", async (req, res, next) => {
    const { title, content, user_id } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id
    ) VALUES (?, ?, ?);
    `,
    [ title, content, user_id ]
  );

      res.status(201).json({ "message" : "postCreated"});
  })
//assignment 4 전체 게시글 조회하기
app.get('/lookup', async(req, res) => {
  await appDataSource.manager.query(
    `SELECT
        posts.id, posts.title, posts.user_id, posts.content, users.id, users.profile_image
        FROM posts, users
        WHERE posts.user_id = users.id;`
    ,(err, rows) => {
            res.status(200).json({"data":rows});
    })
});
//assignment 5 유저의 게시글 조회하기
app.get('/userinfo/:user_id', async(req, res) => {
  const userId = req.params.user_id;
  const result = {};
  const post_list = []; 
  await appDataSource.manager.query(
    `SELECT
        posts.id as post_id, posts.title, posts.user_id, posts.content, users.profile_image
        FROM posts, users
        WHERE posts.user_id = users.id and posts.user_id = ${userId};`
    ,(err, rows) => {
            result["userId"] = rows[0].user_id;
            result["userProfileImage"] = rows[0].profile_image;
            rows.map (el => {
              let tmp = {};
              tmp.postId = el.post_id;
              tmp.title = el.title;
              tmp.content = el.content;
              post_list.push(tmp);
            })
            result.postings = post_list;
            res.status(200).json({"data":result});
    })
});
//assignment 6 게시글 수정하기
app.patch('/modifypost/:post_id', async(req, res) => {
  const postId = req.params.post_id;
  const { content } = req.body
  await appDataSource.manager.query(`
  UPDATE posts
    SET content = ?
    WHERE id = ${postId};`,
    [content]
  );
  await appDataSource.manager.query(`
    SELECT *
    FROM posts
    WHERE id = ${postId};`,
    (err, rows) => {
      let result = rows[0]
      res.status(201).json({"data":result});
    })
});
//assignment 7 게시글 삭제하기
app.delete('/deletepost/:post_id', async(req, res, next) => {
  const postId = req.params.post_id;
    await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ${postId}`,
    );
      res.status(200).json({"message" : "postingDeleted"});
});

//assignment 8 좋아요 누르기
app.post("/likes", async (req, res) => {
  const { user_id, post_id } = req.body;
  console.log(user_id, post_id)
await appDataSource.query(
  `INSERT INTO likes(
    user_id,
    post_id
  ) VALUES (?, ?);
  `,
  [ user_id, post_id ]
);

    res.status(201).json({ "message" : "likeCreated"});
})

  const start = async () => {
    try {
      app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
      console.error(err);
    }
  };
  
  start();



