require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const route = require('./routers');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(route);

app.get('/ping', cors(), (req, res, next) => {
    res.status(200).json({ message : "pong" })
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        consloe.log(err);
    } finally {
        console.log('===========================================');
    }
};

start();