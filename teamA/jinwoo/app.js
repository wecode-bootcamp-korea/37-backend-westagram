require("dotenv").config()

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes")

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.get("/ping", (req, res) => {
  res.status(200).json({ message : "pong" });
})

// app.get("/posts", async (req, res) => {
//   await mysqlDataSource.query(
//     `SELECT
//         usersWesta.id as userId,
//         usersWesta.profile_image as userProfileImage,
//         postsWesta.id as postingId,
//         postsWesta.title as postingTitle,
//         postsWesta.content as postingContent
//       FROM usersWesta
//       INNER JOIN postsWesta
//       ON postsWesta.user_id = usersWesta.id
//       `
//     ,(err, rows) => {
//         res.status(200).json(rows);
//       })
// });

// app.get("/users/:userId/posts", async (req, res, next) => {
//   const userId = req.params.userId;

//   const userInfo = await mysqlDataSource.query(
//     `SELECT
//         usersWesta.id as userId,
//         usersWesta.profile_image
//       FROM usersWesta
//       WHERE id = ${userId};
//     `);
    
//     const posting = await mysqlDataSource.query(
//       `SELECT
//         postsWesta.id as postingId,
//         postsWesta.title as postingTitle,
//         postsWesta.content as postingContent
//       FROM postsWesta
//       INNER JOIN usersWesta
//       ON usersWesta.id = postsWesta.user_id
//       `
//     );
//       userInfo[0].postings = posting;
//       res.status(200).json({ "data" : userInfo[0] });
//     });

// app.post("/users/signup", async (req, res, next) => {
//   const { name, email, profileImage, password } = req.body
//   await mysqlDataSource.query(
//     `INSERT INTO usersWesta(
//       name,
//       email,
//       profile_image,
//       password
//     )
//     VALUES (?, ?, ?, ?)
//     `,
//     [ name, email, profileImage, password ]
//   );
//   res.status(201).json({ message : "Successfully created" });
// })

// app.post("/posts/postup", async (req, res) => {
//   const { title, content, userId } = req.body
//   await mysqlDataSource.query(
//     `INSERT INTO postsWesta(
//       title,
//       content,
//       user_id
//     )
//     VALUES (?, ?, ?);
//     `,
//     [ title, content, userId ]
//   );

//   res.status(201).json({ message : "postCreated" });
// })

// app.post("/like", async (req, res) => {
//   const { userId, postId } = req.body
//   await mysqlDataSource.query(
//     `INSERT INTO likesWesta(
//       user_id,
//       post_id
//     )
//     VALUES (?, ?);
//     `,
//     [ userId, postId ]
//   );
  
//   res.status(201).json({ message : "likeCreated" })
// })

// app.patch("/posts/:postId", async (req, res, next) => {
//   const postId = req.params.postId
//   const { title, content } = req.body

//   await mysqlDataSource.query(
//     `UPDATE postsWesta
//     SET
//       title = ?,
//       content = ?
//     WHERE
//       id = ?
//     `,
//     [ title, content , postId ]
//   );

//   const postsinfo = await mysqlDataSource.query(
//     `SELECT
//       usersWesta.id as userId,
//       usersWesta.name as userName,
//       postsWesta.id as postingId,
//       postsWesta.title as postingTitle,
//       postsWesta.content as postingContent
//     FROM usersWesta
//     INNER JOIN postsWesta
//     ON usersWesta.id = postsWesta.user_id
//     WHERE postsWesta.id = ?;
//     `, [ postId ]
//     )
//       res.status(200).json({ "data" : postsinfo[0] });
//     }
// );

// app.delete("/posts/:postId", async(req, res) => {
//   const { postId } = req.params;
//   await mysqlDataSource.query(
//     `DELETE FROM postsWesta
//     WHERE postsWesta.id = ?
//     `, [ postId ]
//     );
//     res.status(200).json({ message : "successfully deleted" });
// })

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
} catch (err) {
  console.error(err);
}
}

start();