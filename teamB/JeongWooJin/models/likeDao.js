const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})
appDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  appDataSource.destroy()
  });
const pushLikes = async (user_id, post_id) => {
console.log(user_id, post_id);
  try{
    await appDataSource.query(
      `INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (?, ?);
      `,
      [ user_id, post_id ]
    );

    } catch (err) {
     const error = new Error(`INVALID_DATA_INPUT`);
     error.statusCode = 500;
     throw error;
    }
}

module.exports = {
  pushLikes
}