const { DataSource } = require("typeorm");

const database = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// database
//     .initialize()
//     .then(() => {
//         console.log("User data Source has been initialized!");
//     })
//     .catch((err) => {
//         console.error('Error occurred during Data Source initialization', err);
//         database.destroy();
//     });

module.exports = { database };
