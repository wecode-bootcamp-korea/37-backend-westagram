// const express = require('express')
// const cors = require('cors')
// const app = express()
// const logger = require('morgan');
// // require("dotenv").config();


// // app.use(cors())
 
// app.get('/ping', function (req, res, next) {
//   res.json({message: 'pong'})
// })
 
// app.listen(3000, function () {
//   console.log('server listening on port 3000')
// })


// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASS:", process.env.DB_PASS);

// //dotenv.config();

// //console.log({ db_host, db_user, db_pass });

// app.listen(3500, () => { console.log('Running on port 3000');});

// app.use(logger('combined'));


// const dotenv = require("dotenv")
// dotenv.config()
// const { DataSource } = require('typeorm');

// const myDataSource = new DataSource({
//   type: process.env.TYPEORM_CONNECTION,
//   host: process.env.TYPEORM_HOST,
//   port: process.env.TYPEORM_PORT,
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: process.env.TYPEORM_DATABASE
// })

// myDataSource.initialize()
//   .then(() => {
//       console.log("Data Source has been initialized!")
//   })

const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

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
  .catch((err) => {
    console.error("Error during Data Source initialized", err)
    myDataSource.destroy()
  })

  const app =express();
  const PORT = process.env.PORT

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  //health check
  app.get("/ping", (req, res) => {
    res.status(201).json({"message" : "pong"});
  })

  const start = async () => {
    try {
      app.listen(PORT, () => console.log(`Server is listening on $(PORT)`));
    } catch (err) {
      console.error(err);
    }
  };
  
  start();



