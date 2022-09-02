require('dotenv').config();

const http = require ("http");

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
  
const server = http.createServer(app)
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// health check
app.get("/ping", (req, res) => {
    res.json({message : "pong"});
});

//Create a book
app.post('/books', async (req, res, next)=> {
  const {title, description, coverImage } = req.body

  //consol.log(req)

  await appDataSource.query(
    `INSERT INTO books(
        title,
        description,
        cover_image
      ) VALUES(?,?,?);`,
      [ title, description, coverImage ]
  );
  res.status(201).json({ message : 'successfully created'});
})

//Get all books
app.get('/books', async (req, res) => {
  await appDataSource.manager.query(
    `SELECT
        b.id,
        b.title,
        b.description,
        b.cover_image
      FROM books b`
    ,(err, rows) => {
      res.status(200).json(rows);
    })
});


//Update a single book by its pri

//Delete a book
app.delete('/books/:bookId', async(req, res) => {
  const {bookId} = req.params;

    await appDataSource.query(
    `DELETE FROM books
    WHERE books.id = ${bookId}
    `);
      res.status(204).json({ message : "successfully deleted!"});
})

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start();

