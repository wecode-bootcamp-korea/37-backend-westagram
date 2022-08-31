require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

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
    })

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
    
app.get("/ping", (req,res) => {
  res.status(200).json({"message" : "pong"});
})

app.get("/users", async (req,res) => {
  await appDataSource.query(
    `SELECT 
    users.name,
    users.email,
    users.profile_image
    FROM users`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  )
});

app.post("/users", async (req, res, next) => {
  const { name, email, profile_image, password} = req.body  
    await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        profile_image,
        password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profile_image, password]
      );
    res.status(201).json({message : "usercreated"});
  })

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT} `));
  } catch (err) {
    console.error(err);
  }
} 

start()







// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const {DataSource} = require('typeorm'); 

// const app = express();

// dotenv.config();
// app.use(logger('combined')); 
// app.use(cors())
// app.use(express.json())

// app.get('/ping', function (req, res, next) {
//   res.json({message: 'pong'})
//   console.log(req.query)
// })

// app.get('/posts', async(req, res) => {
//   await myDataSource.query(
// `SELECT 
//           posts.id,
//           posts.title,
//           posts.content,
//           posts.user_id
//       FROM posts 
//       `
//   ,(err, rows) => {
//     res.status(200).json(rows);
// });
// });

// app.post('/books', async (req, res) => {
// 	const { title, description, coverImage} = req.body
//     console.log(req);
// 	await myDataSource.query(
// 		`INSERT INTO posts(
// 		    title,
// 		    content,
// 		    user_id
// 		) VALUES (?, ?, ?);
// 		`,
// 		[ title, description, coverImage ]
// 	); 
//      res.status(201).json({ message : "successfully created" });
// 	})
 
// app.listen(3000, function () {
//   console.log('server listening on port 3000')
// })

// const myDataSource = new DataSource({
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE
// })
// // const DataSource1 = myDataSource.query(`SELECT * FROM users`)
// // console.log(DataSource1)
  
// myDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
