// dotenv
require("dotenv").config()

// Built-in package
const http = require("http");

// 3rd-party package
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require("typeorm");
const { join } = require("path");

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()

    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));


// connection check
app.get('/ping', (req, res) => {
    res.status(200).json({ message:'pong' })
})


//create users
app.post('/users', async (req, res, next) => {
    const { name, email, profile_image, password } = req.body
    
    const user = await database.query(`
        SELECT email 
        FROM users 
        WHERE users.email = ?` , [email]
    )

    if (user.length !== 0) { 
        res.status(409).json({ message:'userOverlaped'})
    } else {
        await database.query(
            `INSERT INTO users(
                name,
                email,
                profile_image,
                password
            ) VALUES (?, ?, ?, ?);
            `,
            [ name, email, profile_image, password ]
        );
        res.status(200).json({ message:'userCreated' })
    }
})

// create posts
app.post('/posts', async (req, res, next) => {
    const { title, content, posting_image, user_id } = req.body

    await database.query(
        `INSERT INTO posts(
            title,
            content,
            posting_image,
            user_id
        ) VALUES (?, ?, ?, ?)
        `,
        [ title, content, posting_image, user_id]
    )
    res.status(200).json({ message:'postCreated' })
})

// create likes
app.post('/likes/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.body;
    
    await database.query(
        `INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?)
        `,
        [ userId, postId ]
    )
    res.status(200).json({ message:'likeCreated'})
})

//posts lookup
app.get('/posts', async (req, res, next) => {
    
    const data = await database.query(
        `SELECT 
            u.id as userId, 
            u.profile_image as userProfileImage,
            p.id as postingId, 
            p.posting_image as postingImageUrl,
            p.content as postingContent
         FROM posts as p
         INNER JOIN users as u
         ON p.user_id = u.id
        `
    )
    res.status(200).json({ data:data });
})

//post lookup by userId
app.get('/posts/:userId', async (req, res, next) => {
    const { userId } = req.params;
    
    const data = await database.query(
        `SELECT
            u.id as userId,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.posting_image as postingImageUrl,
            p.content as postingContent
        FROM posts as p
        INNER JOIN users as u
        ON p.user_id = u.id
        WHERE p.user_id = ${userId}
        `
    )
    res.status(200).json({ data: {
        'userId' : data[0].userId,
        'userProfileImage' : data[0].userProfileImage,
        'postings' : [{
            'postingId' : data[0].postingId,
            'postingImageUrl' : data[0].postingImageUrl,
            'postingContent' : data[0].postingContent
        }]
    }})
})

// post update
app.patch('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, posting_image } = req.body;

    await database.query(
        `UPDATE posts
         SET
            title = ?,
            content = ?,
            posting_image = ?
        WHERE posts.id = ?
        `,
        [ title, content, posting_image, postId]
    )
    
    const data = await database.query(
        `SELECT
            u.id as userId,
            u.name as userName,
            p.id as postingId,
            p.title as postingTitle,
            p.content as postingContent
        FROM posts as p
        INNER JOIN users as u
        ON u.id = p.user_id
        `
    )
    res.status(200).json({ data:data })
})

//post delete
app.delete('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params

    await database.query(
        `DELETE FROM posts
         WHERE posts.id = ${postId}
        `
    )
    res.status(200).json({ message:'postingDeleted'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

start();