const { DataSource, TypeORMError } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    appDataSource.destroy();
  });

const createPost = async (title, content, user_id) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?, ?, ?);
      `,
      [title, content, user_id]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const lookUpPost = async () => {
  try {
    return await appDataSource.query(
      `SELECT
      posts.id, 
      posts.title, 
      posts.user_id, 
      posts.content, 
      users.id, 
      users.profile_image
      FROM users INNER JOIN posts on posts.user_id = users.id
      WHERE posts.id like ${postId};`
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const modifyPost = async (postId, content) => {
  try {
    await appDataSource.query(
      `UPDATE posts
        SET content = ?
        WHERE id = ${postId};`,
      [content]
    );

    const result = await appDataSource.query(
      `SELECT *
        FROM posts
        WHERE id = ${postId};`
    );
    return [result];
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    await appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ${postId}`
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  lookUpPost,
  modifyPost,
  deletePost
};
