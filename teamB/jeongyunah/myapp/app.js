const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan');
app.use(cors())
 
app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'})
})
 
app.listen(3000, function () {
  console.log('server listening on port 3000')
})

//require("dotenv").config();

 console.log("DB_HOST:", process.env.DB_HOST);
 console.log("DB_USER:", process.env.DB_USER);
 console.log("DB_PASS:", process.env.DB_PASS);
// console.log({ db_host, db_user, db_pass });

//dotenv.config();

app.listen(3500, () => { console.log('Running on port 3000');});
app.use(logger('combined'));

const dotenv = require("dotenv")

dotenv.config()

const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
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
















