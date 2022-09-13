const express = require('express');
const http = require('http');

const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config()
const { DataSourece, DataSource } = require('typeorm');

const myDataSource = new DataSource( {
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

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(cors()); //서버를 실행시킬때 실행되는 미들웨어
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(200).json({'message' : 'pong'});
})

app.post('/users/sign-up', async (req, res) => {
    const { name, email, profile_image, password} = req.body

    await myDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, profile_image, password ]
    )
    res.status(201).json({ message : 'successfully created' });
})

const start = async () => {
    try { //비동기 함수(에러 핸들링)
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (err) {
        console.error(err);
    }
};

start()