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

app.delete('/deletepost/:post_id', async(req, res) => {
  const postId = req.params.post_id;
    await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ${postId}`,
    (err, rows) => {
      res.status(201).json({"message" : "postingDeleted"});
    })
});



  const start = async () => {
    try {
      app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
      console.error(err);
    }
  };
  
  start();



