require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors'); //web 3.0 세대 프/백 간 통신 완화
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const route = require('./routes');

const app = express();

const { DataSource } = require('typeorm');
const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

database.initialize()
// DB와 비동기로 연결 * promise() 공부!!
//외부 요청 내용값, body를 parsing|bodyparser를 대체

//app.use => middleware를 추가하는 함수
app.use(cors());
app.use(morgan('combined'));
//morgan 로깅 서비스가 기본적으로 제공하는 옵션이 몇 개 있다.
//ex) 'combined' ::1 - - [30/Aug/2022:16:01:10 +0000] "GET /ping HTTP/1.1" 200 18 "-" "HTTPie/3.2.1"
//ex) 'tiny' GET/ping 200 18 - 2.150 ms
//ex) 'dev' GET/ping 200 2.204 ms - 18
app.use(express.json());
//Router app.httpMethod(): app.use()로 수렴되는 모든 http 메소드를 각각의 요청에 맞게 의도한 callback함수만 동작하도록 분기처리.
app.use(route);
//health check : 운영중인 시스템의 구성요소 가동현황 분석을 통하여 시스템의 전반적인 건강상태를 진단합니다. 시스템 진단 컨설팅은 개선이 필요한 Weak Point를 도출하고 운영 중 발생할 수 있는 위험요소를 찾아내어 제공합니다.
app.get('/ping', cors(), (req, res, next) => {
    res.status(200).json({ message : "pong" })
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        throw err; //상위 컨텍스트로 에러 전파
    } finally {
        console.log('===========================================');
    }
};

start();

//Register
app.post('/users', async (req, res, next) => {
    const { first_name, last_name, age } = req.body;

    await database.query(
        `INSERT INTO users(
            first_name,
            last_name,
            age
        ) VALUES (?, ?, ?);
        `,
        [ first_name, last_name, age ]
    );

    res.status(201).json({ message : "userCreated" });
});

//Create post
app.post('/posts', async (req, res, next) => {
    const { title, description, coverImage, users_id } = req.body;

    await database.query(
        `INSERT INTO posts(
            title,
            description,
            cover_image,
            users_id
        ) VALUES (?, ?, ?, ?);
        `,
        [ title, description, coverImage, users_id ]
    );

    res.status(201).json({ message : "postingCreated" });
});

// Get all posts
app.get('/posts', async (req, res) => {
    await database.query(
        `SELECT
            p.id,
            p.title,
            p.description,
            p.cover_image,
            p.users_id
        FROM posts p
        `,(err, rows) => {
            res.status(200).json(rows);
    });
})

//Get all posts along with users
app.get('/users/:userId', async (req, res) => {
    let userId = req.params.userId; // 주소에 포함된 변수를 담는다.
    
    await database.query( //주소 바깥, ? 이후 변수를 담는다. &로 여러 데이터를 넘길 수 있다.
        `SELECT
            users.id AS userId, 
            users.age AS userAge
        FROM users WHERE users.id = ${userId}
        `, (err, rows) => {
            let userRow = rows;
            database.query(
                `SELECT 
                    posts.id AS postingId, 
                    posts.cover_image AS postingImageUrl, 
                    posts.description AS postingContent
                FROM posts WHERE ${userId} = users_id`,
                (err, rows) => {
                    userRow[0].postings = rows;
                    res.status(200).json({ data : userRow[0] });
                }
            )
        }
    )
});

//Update a single user by its primary key
app.patch('/posts', async(req, res) => {
    const { title, description, coverImage, postId } = req.body;

    await database.query(
        `UPDATE posts
        SET title = ?,
            description = ?,
            cover_image = ?
        WHERE id = ?
        `,
        [ title, description, coverImage, postId ]
    );
        res.status(201).json({ message : "successfully updated" });
});

//Delete a post
app.delete('/posts/:postId', async(req, res) => {
    const postId = req.params.postId;

    await database.query(
        `DELETE FROM posts
           WHERE posts.id = ${postId}
        `
    );
    console.log(req);
    res.status(200).json({ message : "successfully deleted" });
})

//Likes
app.post('/likes', async(req, res) => {
    const { userId, postId } = req.body;

    await database.query(
        `INSERT INTO likes (
            users_id,
            posts_id
        ) VALUES (?, ?)
        `, [ userId, postId ]
    );
        res.status(201).json({ message : "likeCreated" });
})

// start server
// const start = async () => {
//     try {
//         server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
//     } catch (err) {
//         throw err; //상위 컨텍스트로 에러 전파
//     } finally {
//         console.log('===========================================');
//     }
// };

// start();
// require('dotenv').config();

// const http = require('http');
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');




// const routes = require('./routes');//js 모듈은 기본적으로 해당 파일을 불러올 때 index.js를 우선적으로 참조
// const app = express();

// //app.use => middleware를 추가하는 함수
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(routes);
// //Router app.httpMethod(): app.use()로 수렴되는 모든 http 메소드를 각각의 요청에 맞게 의도한 callback함수만 동작하도록 분기처리.

// app.get('/ping', (req, res) => {
//     res.json({ message : "pong" });
// });

// const server = http.createServer(app);
// const PORT = process.env.PORT || 3000;

// // start server
// const start = async () => {
//     try {
//         server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
//     } catch (err) {
//         throw err; //상위 컨텍스트로 에러 전파
//     } finally {
//         console.log('===========================================');
//     }
// };

// start();



// require('dotenv').config();
// const http = require('http');
// const express = require('express');
// const cors = require('cors'); //web 3.0 세대 프/백 간 통신 완화
// const morgan = require('morgan');
// //morgan 로깅 서비스가 기본적으로 제공하는 옵션이 몇 개 있다.
// //ex) 'combined' ::1 - - [30/Aug/2022:16:01:10 +0000] "GET /ping HTTP/1.1" 200 18 "-" "HTTPie/3.2.1"
// //ex) 'tiny' GET/ping 200 18 - 2.150 ms
// //ex) 'dev' GET/ping 200 2.204 ms - 18
// const { DataSource } = require('typeorm');
// // const { builtinModules } = require('module');
// const database = new DataSource({
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE
// });

// database.initialize()
//     .finally(() => {
//         console.log("Data Source has been initialized!");
//     })
//     .catch((err) => {
//         console.error(err);
//         database.destroy();
//     });
// // DB와 비동기로 연결 * promise() 공부!!
// //외부 요청 내용값, body를 parsing|bodyparser를 대체

// //health check : 운영중인 시스템의 구성요소 가동현황 분석을 통하여 시스템의 전반적인 건강상태를 진단합니다. 시스템 진단 컨설팅은 개선이 필요한 Weak Point를 도출하고 운영 중 발생할 수 있는 위험요소를 찾아내어 제공합니다.
// //Register
// app.post('/users', async (req, res) => {
//     const { first_name, last_name, age } = req.body;

//     await database.query(
//         `INSERT INTO users(
//             first_name,
//             last_name,
//             age
//         ) VALUES (?, ?, ?);
//         `,
//         [ first_name, last_name, age ]
//     );

//     res.status(201).json({ message : "userCreated" });
// });

// //Create post
// app.post('/posts', async (req, res, next) => {
//     const { title, description, coverImage } = req.body;

//     await database.query(
//         `INSERT INTO posts(
//             title,
//             description,
//             cover_image
//         ) VALUES (?, ?, ?);
//         `,
//         [ title, description, coverImage ]
//     );

//     res.status(201).json({ message : "postingCreated" });
// });

// // Get all posts
// app.get('/posts', async (req, res) => {
//     await database.query(
//         `SELECT
//             p.id,
//             p.title,
//             p.description,
//             p.cover_image
//         FROM posts p
//         `,(err, rows) => {
//                 res.status(200).json(rows);
//     });
// })

// //Get all posts along with users
// app.get('/users', async (req, res) => {
//     await database.query(
//         `SELECT
//             posts.id, 
//             posts.title, 
//             posts.description, 
//             posts.cover_image, 
//             users.first_name, 
//             users.last_name, 
//             users.age 
//         FROM likes l 
//         INNER JOIN users ON l.users_id = users.id 
//         INNER JOIN posts ON l.posts_id = posts.id
//         `, (err, rows) => {
//             res.status(200).json(rows);
//     });
// });

// //Update a single user by its primary key
// app.patch('/posts', async(req, res) => {
//     const { title, description, coverImage, postId } = req.body;
    
//     await database.query(
//         `UPDATE posts
//         SET
//             title = ?,
//             description = ?,
//             cover_image = ?
//         WHERE id = ?
//         `,
//         [ title, description, coverImage, postId ]
//     );
//         res.status(201).json({ message : "successfully updated" });
// });

// //Delete a post
// app.delete('/posts/:postId', async(req, res) => {
//     const { postId } = req.params;

//     await database.query(
//         `DELETE FROM posts
//         WHERE posts.id = ${postId}`
//     );
//         res.status(204).json({ message : "successfully deleted" });
// })

// //Likes
// app.post('/likes', async(req, res) => {
//     const { userId, postId } = req.body;

//     await database.query(
//         `INSERT INTO likes (
//             users_id,
//             posts_id
//         ) VALUES (?, ?)
//         `, [ userId, postId ]
//     );
//         res.status(201).json({ message : "likeCreated" });
// })

// // module.exports = { app };

//app.js 로 불러온 내용을 index.js로 분기시키고 userRouter.js를 거쳐 각각 원하는 컨트롤러가 있는 곳으로 routing 된다.