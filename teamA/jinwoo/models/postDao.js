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

  const createPost = async ( title, content, userId ) => {
    try {
      return await mysqlDataSource.query(
        `INSERT INTO postsWesta(
          title,
          content,
          user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, userId ]
      );
    } catch (err) {
      const error = new Error('INVALID_DATA_INPUT');
      error.statusCode = 500;
      throw error;
    }
  };

  const showPosts = async () => {
      return await mysqlDataSource.query(
        `SELECT
            usersWesta.id as userId,
            usersWesta.profile_image as userProfileImage,
            postsWesta.id as postingId,
            postsWesta.title as postingTitle,
            postsWesta.content as postingContent
          FROM usersWesta
          INNER JOIN postsWesta
          ON postsWesta.user_id = usersWesta.id
          `
        );
    };

  const delPosts = async ( postId ) => {
    return await mysqlDataSource.query(
      `DELETE FROM postsWesta
       WHERE postsWesta.id = ?
      `,
      [ postId ]
      );
  };

  const modifyPosts = async( postId, title, content ) => {
    try {
      return await mysqlDataSource.query(
        `UPDATE postsWesta SET
          title = ?,
          content = ?
        WHERE
          id = ${postId}
        `,
        [ title, content ]
      );
    } catch (err) {
      const error = new Error('INVALID_DATA_INPUT');
      error.statusCode = 500;
      throw error;
    }
  };

  module.exports = { createPost, showPosts, delPosts, modifyPosts }