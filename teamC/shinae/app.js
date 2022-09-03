require('dotenv').config();

// Built-in package
const http = require ("http");

// 3rd-party package
const express = require ("express");
const cors = require ("cors");
const app = express();
const morgan = require ("morgan");
const { DataSource } = require("typeorm");``

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(()=> {
      console.log("Data Sourse has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })


app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// health check
app.get("/ping", (req, res) => {
    res.status(200).json({message : "pong"});
});

//user sign-up
app.post('/user/sign-up', async (req, res)=> {
  const {id, name, email, password } = req.body

  await appDataSource.query(
    `INSERT INTO users(
        id,
        name,
        email, 
        password,
      ) VALUES(?,?,?,?);
      `,
      [ id, name, email, password  ]
  );
  res.status(201).json({ message : "userCreated"});
})

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start();

