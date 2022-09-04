require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');
const morgan = require('morgan');

const app = express();
const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PROT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/ping', (req, res, next) => {
  res.status(200).json({ message: 'pong' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
