const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config()

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
    myDataSource.destroy()
  })

  const app = express();
  const PORT = process.env.PORT

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  app.get("/ping", (req,res) => {
    res.status(200).json({"message" : "pong"});
  })

  app.get("/users", async (req,res) => {
    await myDataSource.query(
      `SELECT 
      users.name,
      users.email,
      users.profile_image
      FROM users`,
      (err, rows) => {
        res.status(200).json(rows);
      })
  });

  app.get("/users/:user_id", async (req,res) => {
    const user_id = req.params.user_id;
    console.log(user_id)
    await myDataSource.query(
      `select 
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.title as postingTitle,
      posts.content as postingContent 
      from posts inner join users on posts.user_id = users.id where users.id like ${user_id};
      `,
      (err, rows) => {
        console.log(rows)
        const posting = [];
        rows.map((el) => {
          posting.push({postingId : user_id, postingTitle : el.postingTitle, postingContent : el.postingContent
          })
        })
        result = { userId : user_id, userProfileImage : rows[0].userProfileImage, postings : posting}
        res.status(200).json({data : result});
      }
    )
  })

  app.get("/post", async (req,res) => {
    await myDataSource.query(
      `select
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.title as postingTitle,
      posts.content as postingContent
      from posts inner join users on posts.user_id = users.id;`,
      (err, rows) => {
        console.log(rows)
        res.status(200).json({data :rows[1]});
      })
  })

  app.post("/user", async (req, res, next) => {
    const { name, email, profile_image, password} = req.body
    await myDataSource.query(
      `INSERT INTO users(
        name,
        email,
        profile_image,
        password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profile_image, password]
      );
    res.status(201).json({message : "userCreated"});
  })

  app.post("/post", async (req, res, next) => {
    const { title, content, user_id} = req.body
    await myDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id
        ) VALUES (?, ?, ?);
      `,
      [title, content, user_id]
    );
    res.status(201).json({message : "postCreated"});
  })

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT} `));
  } catch (err) {
    console.error(err);
  }
} 

start();