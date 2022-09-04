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
  res.status(200).json({ message : "pong" });
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