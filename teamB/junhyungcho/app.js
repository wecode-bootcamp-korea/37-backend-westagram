require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors'); //web 3.0 세대 프/백 간 통신 완화
const morgan = require('morgan');
// const dotenv = require('dotenv');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

const { DataSource } = require('typeorm');
const { builtinModules } = require('module');
const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

database.initialize()
    .then(() => console.log("Data Source has been initialized!")
);
// DB와 비동기로 연결 * promise() 공부!!
//외부 요청 내용값, body를 parsing|bodyparser를 대체

//app.use => middleware를 추가하는 함수
app.use(cors());
app.use(morgan('dev'));
//morgan 로깅 서비스가 기본적으로 제공하는 옵션이 몇 개 있다.
//ex) 'combined' ::1 - - [30/Aug/2022:16:01:10 +0000] "GET /ping HTTP/1.1" 200 18 "-" "HTTPie/3.2.1"
//ex) 'tiny' GET/ping 200 18 - 2.150 ms
//ex) 'dev' GET/ping 200 2.204 ms - 18
app.use(express.json());
//Router app.httpMethod(): app.use()로 수렴되는 모든 http 메소드를 각각의 요청에 맞게 의도한 callback함수만 동작하도록 분기처리.
//health check : 운영중인 시스템의 구성요소 가동현황 분석을 통하여 시스템의 전반적인 건강상태를 진단합니다. 시스템 진단 컨설팅은 개선이 필요한 Weak Point를 도출하고 운영 중 발생할 수 있는 위험요소를 찾아내어 제공합니다.
app.get('/ping', cors(), (req, res, next) => res.status(200).json({ message : "pong" }));
//Create a book
app.post('/books', async (req, res, next) => {
    const { title, description, coverImage } = req.body;
    // console.log(req);

    await database.query(
        `INSERT INTO books(
            title,
            description,
            cover_image
        ) VALUES (?, ?, ?);
        `,
        [ title, description, coverImage ]
    );

    res.status(201).json({ message : "successfully created" });
});

//Get all books
app.get('/books', async (req, res) => {

    await database.query(
    `SELECT
            b.id,
            b.title,
            b.description,
            b.cover_image
        FROM books b`
    ,(err, rows) => {
        res.status(200).json(rows);
    });
});

// start server
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`===This is app===\r\n\n${app}\r\n\n===This is express===\r\n\n${express}\r\n`));
        // server.listen(PORT, () => console.log(`====Server is listening on ${PORT}====`));
    } catch (err) {
        throw err; //상위 컨텍스트로 에러 전파
      }
};

start();
// module.exports = { app };