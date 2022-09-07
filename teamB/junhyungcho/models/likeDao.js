const { DataSource } = require('typeorm');

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database
    .initialize()
    .then(() => {
      console.log("Like data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
      appDataSource.destroy()
    })
    .finally(() => console.log("==========================================="));

const createLike = async ( userId, postId ) => {
    try {
        return await database.query(
            `INSERT INTO likes(
                users_id,
                posts_id
            ) VALUES (?, ?);
            `,
            [ userId, postId ]
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 400;
        throw error;
    }
}


module.exports = {
    createLike
}