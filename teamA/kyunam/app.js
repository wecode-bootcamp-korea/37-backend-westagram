require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');
const morgan = require('morgan');

const app = express();
const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PROT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/ping', (req, res, next) => {
  res.status(200).json({ message: 'pong' });
});

app.get('/posts', async (req, res, next) => {
  const posts = await appDataSource.query(
    `SELECT * 
     FROM posts
     `
  );
  res.status(200).json({ data: posts });
});

app.get('/users/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  const user = await appDataSource.query(
    `SELECT u.id, u.profile_image 
       FROM users u
       WHERE u.id = ?
      `,
    [userId]
  );
  const post = await appDataSource.query(
    `SELECT p.id, p.title, p.content 
       FROM posts p join users u
       ON p.user_id = u.id and u.id= ?
      `,
    [userId]
  );
  user[0].postings = post;
  res.status(200).json({ data: user[0] });
});

app.post('/users', async (req, res, next) => {
  const { name, email, profile_image, password } = req.body;
  await appDataSource.manager.query(
    `INSERT INTO users(
        name,
        email,
        profile_image,
        password
    )VALUES(? ,? ,? ,?);
    `,
    [name, email, profile_image, password]
  );
  res.status(201).json({ message: 'userCreated' });
});

app.post('/posts', async (req, res, next) => {
  const { title, content, user_id } = req.body;
  await appDataSource.query(
    `INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?, ?, ?)
      `,
    [title, content, user_id]
  );
  res.status(201).json({ message: 'postCreated' });
});

app.post('/likes', async (req, res, next) => {
  const { userId, postId } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
        user_id,
        post_id
        )VALUES(?, ?)
      `,
    [userId, postId]
  );
  res.status(201).json({ message: 'likeCreated' });
});

app.patch('/posts', async (req, res, next) => {
  const { content } = req.body;
  await appDataSource.query(
    `UPDATE posts
       SET content= ?
       WHERE user_id=1 and id=1
      `,
    [content]
  );
  const post = await appDataSource.query(
    `SELECT u.id as userId, u.name, p.id, p.title, p.content
       FROM users u join posts p 
       ON u.id = p.user_id and p.id=1
      `
  );
  res.status(200).json({ data: post[0] });
});

app.delete('/posts/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  await appDataSource.query(
    `DELETE FROM posts
      WHERE id = ?
      `,
    [postId]
  );
  res.status(200).json({ message: 'postingDeleted' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
