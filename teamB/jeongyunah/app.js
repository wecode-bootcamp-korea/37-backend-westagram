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
  .catch((err) => {
    console.log("Error during Data Source initalization", err)
  });

app.use(logger('combined')); 
app.use(cors()) 
app.use(express.json()) 

app.get('/ping', function (req, res) {
  res.json({message: 'pong'})
})

const serverStart = async () => { 
  app.listen(process.env.PORT, function () {
    console.log('server listening on port 3000')
})};

serverStart() 