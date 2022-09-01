require("dotenv").config()

const http = require("http");

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const { DataSource } = require('typeorm')

const mysqlDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

mysqlDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/ping", (req, res) => {
  res.json({ message : "pong" });
})

app.post("/signup", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body

  await mysqlDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?);
    `,
    [ name, email, profile_image, password ]
  );

  res.status(201).json({ message : "Successfully created" });
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
} catch (err) {
  console.error(err);
}
}

start()