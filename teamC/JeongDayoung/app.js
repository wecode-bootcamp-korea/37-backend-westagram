require(dotenv).config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const appDataSource = new DataSource({
  type : process.env.TYPEORM_CONNECTION,
  host : process.env.TYPEORM_HOST,
  port : process.env.TYPEORM_PORT,
  username : process.env.TYPEORM_USERNAME,
  password : process.env.TYPEORM_PASSWORD,
  database : process.env.TYPEORM_DATABASE
}) 

appDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!");
  })
  .catch((err) =>{
     console.err("Error during Data Source initialization", err);
      appDataSource.destroy()
  });

app.get('/ping', function(req, res, next){
  res.json({message : 'pong'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`erviser is listening on  ${PORT}`))
}
start();