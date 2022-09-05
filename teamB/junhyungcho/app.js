require('dotenv').config()
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

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
    .then(() => console.log("Data Source has been initialized!")
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined')); 
app.get('/ping', cors(), (req, res, next) => res.json({ message : "pong" }));

const server = http.createServer(app);
const PORT = process.env.PORT;
const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();