
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const { DataSource } = require('typeorm')

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

app.use(logger('combined'));

app.use(cors())

app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'})
})

app.listen(3000, function () {
  console.log('server listening on port 3000')
})

 console.log("DB_HOST:", process.env.DB_HOST);
 console.log("DB_USER:", process.env.DB_USER);
 console.log("DB_PASS:", process.env.DB_PASS);

















