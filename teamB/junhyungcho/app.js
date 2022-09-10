require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { database } = require("./models/dataSource");
const route = require("./routers");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);

app.get("/ping", cors(), (req, res, next) => {
  res.status(200).json({ message: "pong" });
});

const start = async () => {
  const PORT = process.env.PORT || 3000;

  try {
    await database.initialize();
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } 
  catch (err) {
    consloe.log(err);
  }
};

start();
