require('dotenv').config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const { DataSource } = require('typeorm');

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    });


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
const server = http.createServer(app)
const PORT = process.env.PORT;


app.get("/ping", (req, res) => {
    const { title, description, coverImage} = req.body
    
	await myDataSource.query(
		`INSERT INTO books(
		    title,
		    description,
		    cover_image
		) VALUES (?, ?, ?);
		`,
		[ title, description, coverImage ]
	); 
     res.status(201).json({ message : "successfully created" });
	})


const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()