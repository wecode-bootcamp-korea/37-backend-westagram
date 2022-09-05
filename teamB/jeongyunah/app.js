require('dotenv').config();

const express = require('express');  
const cors = require('cors'); 
const logger = require('morgan');
const app = express(); 
const { DataSource } = require('typeorm')

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
    console.log("Error during Data Source initalization", err)
  });

app.use(logger('dev')); 
app.use(cors()) 
app.use(express.json()) 
const PORT = process.env.PORT

app.get('/ping', function (req, res) {
  res.json(200, { message: 'pong'})
})

app.post("/signup", async(req, res, next) => {
  const { name , email, password} = req.body
 await appDataSource.query(
  `INSERT INTO users(
    name, 
    email, 
    password
    ) VALUES (?, ?, ?);`,
    [ name , email, password ]
 );
 res.status(201).json({ message : "userCreated"});
});

app.post("/postup", async(req, res, next) => {
  const {title, content, user_id} = req.body
  
  await appDataSource.query (
    `INSERT INTO posts(
      title, 
      content, 
      user_id
    ) VALUES (?, ?, ?);`,
    [title, content, user_id]
  );

 res.status(201).json({ message : "postCreated"});
})

app.get('/allposts', async(req, res) => {
  await appDataSource.manager.query(
    `SELECT
      p.id,
      p.title,
      p.content,
      p.user_id
    FROM posts p`
    ,(err, rows) => {
      res.status(200).json(rows);
    })
})

app.get('/userposts/:inputId', async(req, res)=>{
  const userId = req.params.inputId;
  const user = await appDataSource.manager.query(
    `SELECT
          users.id as userId,
          users.profile_image as userProfileImage
      FROM users
      WHERE users.id = ${userId};
      `)
  const userpost = await appDataSource.manager.query(
    `SELECT 
          posts.id as postingId,
          posts.title as postingImageUrl,
          posts.content as postingContent
      FROM posts
      WHERE user_id = ${userId};`)

    user[0].postings = userpost;
    res.status(200).json({ data : user[0]});
})

app.patch('/modifyposts/:inputId', async(req, res) =>{
  const userId = req.params.inputId;
  const {content} = req.body;
  await appDataSource.manager.query(
    `UPDATE posts
     SET content = ?
     WHERE user_id = ${userId}`,
    [content]
  );

  const result = await appDataSource.manager.query(
    `SELECT 
    posts.content as postingContent,
    posts.user_id as userId,
    posts.id as postingId,
    posts.title as postingTitle,
    users.name as userName
    FROM posts, users
    WHERE user_id = ${userId}`
  )
  res.status(201).json({ data : result[0]});
})

app.delete('/deletePost/:inputPostId', async(req, res) => {
  const postId = req.params.inputPostId;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId}`
  );
    res.status(200).json({ message : "postingDeleted"})
})

app.post('/likes', async (req, res) => {
  const {user_id, post_id} = req.body
  await appDataSource.query(
    `INSERT INTO likes(
      user_id, 
      post_id
    ) VALUES (?, ?);`,
    [user_id, post_id]
  );
  res.status(201).json({message : "likeCreated"})
})

const serverStart = async () => { 
  app.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`)
  })
};

serverStart() 
