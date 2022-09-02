const http      = require ("http");
const express   = require ("express");
const cors      = require("cors");
const morgan    = require("morgan");
const dotenv    = require("dotenv");
const { DataSource } = require('typeorm')

dotenv.config();

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
})
.catch(() => {
    console.log("Error during Data Source initialization", err)
database.destroy()
})

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get("/ping", (req, res) => {
    res.json({message : "pong"});
});

app.post("/users", async (req, res, next) => {
    const { name, email, profile_image, password } = req.body

    await database.query(
        `INSERT INTO users (
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
    [ name, email, profile_image, password ]
    );
    
    res.status(201).json({message : "userCreated"})
})

const start = async () => {
    try{
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
}

start()