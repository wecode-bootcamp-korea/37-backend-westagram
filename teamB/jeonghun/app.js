require('dotenv').config();
const http = require ('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
   });

appDataSource.initialize()
  .then(() => {
   console.log('Data Source has been initialized!')  
  })
  .catch((error) => {
   console.error('Error during Data source initialization', error);
});

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next) {
    res.status(200).json({message: 'pong'});
  });

app.post('/user/signup', async (req, res, next) => {
   const { name, email, profileImage, password } = req.body

   await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
      ) VALUES (?, ?, ?, ?);
      `,
      [ name, email, profileImage, password ]
     );
        res.status(201).json({ message : 'userCreated'});
   })

  app.post('/post', async (req, res, next) => {
      const { title, content, userid } = req.body
    
      await appDataSource.query(
        `INSERT INTO posts(
          title,
          content,
          user_id
          ) VALUES (?, ?);
          `,
          [ title, content, userid ]
        );
         res.status(201).json({ message : 'successfully created'});
        })    

        app.post('/like', async (req, res, next) => {
          const { userid, postid } = req.body
        
          await appDataSource.query(
            `INSERT INTO likes(
              user_id,
              post_id
              ) VALUES (?, ?);
              `,
              [ userid, postid ]
            );
             res.status(201).json({ message : 'successfully created'});
            })   

  app.get('/user', async (req, res) => {
    await appDataSource.manager.query(
      `SELECT
          u.id,
          u.title,
          u.description,
          u.cover_image
         FROM users u`
      ,(err, rows) => {
         res.status(200).json(rows);
    })
});

app.get('/users-with-posts', async (req, res) => {
  await appDataSource.manager.query(
    `SELECT
         users.name,
         users.email,
         users.profile_image,
         users.cover_image,
         posts.title,
         posts.content,
         posts.user_id
        FROM users_posts ba
        INNER JOIN posts ON ba.post_id = posts.id
        INNER JOIN users ON ba.user_id = users.id`
    ,(err, rows) => {
         res.status(200).json(rows);
    })
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to request on port ${PORT}`);
});

