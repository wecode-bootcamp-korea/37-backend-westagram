const { DataSource } = require('typeorm');

const mysqlDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

mysqlDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
      mysqlDataSource.destroy();
  });

  const createUser = async ( name, email, password, profileImage ) => {
    try {
      return await mysqlDataSource.query(
        `INSERT INTO usersWesta(
          name,
          email,
          password,
          profile_image
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, password, profileImage ]
      );
    } catch (err) {
      const error = new Error('INVALID_DATA_INPUT');
      error.statusCode = 500;
      throw error;
    }
  };

  const readPosts = async (userId) => {

    const postings = await mysqlDataSource.query(
      `SELECT
        postsWesta.id as postingId,
        postsWesta.title as postingTitle,
        postsWesta.content as postingContent
      FROM postsWesta
      WHERE postsWesta.user_id = ${userId};
      `
    );
      return [postings]
    };

  module.exports = { createUser, readPosts }