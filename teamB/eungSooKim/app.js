require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const routes = require("./routers");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(routes);
const server = http.createServer(app);
const PORT = process.env.PORT;

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
start();
