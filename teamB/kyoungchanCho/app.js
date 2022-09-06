require('dotenv').config();

const http = require("http");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { DataSource } =require('typeorm');

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

app = express()
const server = http.createServer(app);
const PORT = process.env.PORT;

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(route);
// app.get("/ping", (req, res) => {
//     res.json({ message : "pong"})
// })

// app.post("/users/signup", async (req, res, next) => {
//     const { name, email, profileImage, password } = req.body
    
//     let hashedPassword;
//     const saltRounds = 12;

//     const makeHash = async (password, saltRounds) => {
//         return await bcrypt.hash(password, saltRounds);
//     }

//     const main = async () => {
//         const hashedPassword = await makeHash(password, saltRounds);
//         return await bcrypt.has(password,saltRounds);
//     }

//     hashedPassword = await makeHash(password,saltRounds);

//     await database.query(    
//         `INSERT INTO users(
//             name,
//             email,
//             profile_image,
//             password
//         ) VALUES (?, ?, ?, ?);
//         `,
//         [ name, email, profileImage, hashedPassword ]
//     );
//     res.status(201).json({ message : "userCreated" })
// })

// app.post("/posts", async (req, res, next) => {
//     const { title, content, userId } = req.body

//     await database.query(
//         `INSERT INTO posts(
//             title,
//             content,
//             user_id
//         ) VALUES (?, ?, ?);
//         `,
//         [ title, content, userId ]
//     );
//     res.status(201).json({ message : "postCreated"})
// })

// app.get("/posts", async (req, res) =>{
//     const [posts] = await database.query(
//         `SELECT 
//             users.id AS userId,
//             users.profile_image AS usersProfileImage,
//             posts.id AS postingId,
//             posts.title AS postingTitle,
//             posts.content AS postingContent
//         FROM posts JOIN users ON posts.user_id = users.id;
//         `
//     );
//     res.status(200).json({ "data" : posts})            
// })

// app.get('/users/:userId/posts', async (req, res, next) => {
//     const userId = req.params.userId;
//     const [postsByUser] = await database.query(
//         `SELECT
//             users.id AS userId,
//             users.profile_image AS userProfileImage
//         FROM users
//         where users.id = ?
//         `,
//         [userId]
//     );
//     const selectedPosts = await database.query(
//         `SELECT
//             posts.id AS postingId,
//             posts.content AS postingContent,
//             posts.title AS postsTitle
//         FROM posts
//         WHERE posts.user_id = ?          
//         `,
//         [userId]
//     );
//     postsByUser["positngs"] = selectedPosts
//     res.status(200).json({"data":postsByUser})
// })

// app.patch('/posts/:postId', async (req, res, next) => {
//     const postId = req.params.postId
//     const { title } = req.body 

//     await database.query(
//         `UPDATE posts SET
//             posts.title = ?
//         WHERE posts.id = ?
//         `,
//         [ title, postId ]
//     );
//     const [patchedPost] = await database.query(
//         `SELECT
//             users.id AS userId,
//             users.name AS userName,
//             posts.id AS postingId,
//             posts.title AS postingTItle,
//             posts.content AS postingContent
//         FROM users 
//         JOIN posts ON posts.user_id = users.id
//         WHERE posts.id = ?
//         `,
//         [ postId ]
//     )
//     res.status(201).json({"data" : patchedPost})            
// });

// app.delete('/posts/:postId', async (req, res, next) => {
//     const postId = req.params.postId
//     await database.query(
//         `DELETE
//         FROM posts
//         WHERE posts.id = ?
//     `,
//     [ postId ]
//     )
//     res.status(200).json({ message : "postingDeleted"})
// }); 

// app.post('/posts/likesdata', async (req, res) => {
//     const { userId, postId } = req.body

//     await database.query(
//         `INSERT INTO likes (
//             user_id,
//             post_id
//         ) VALUES ( ?, ? );   
//         `,
//         [ userId, postId ]
//     );
//     res.status(201).json({ message : "likeCreated"})    
// })

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()