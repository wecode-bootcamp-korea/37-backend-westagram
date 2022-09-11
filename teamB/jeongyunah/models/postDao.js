const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  }) 
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    myDataSource.destroy();
  });

const createPost = async (title, content, user_id) => {
  try {
    return await myDataSource.query(` 
        INSERT INTO posts(
          title, 
          content, 
          user_id
        ) VALUES (?, ?, ?);`,
        [title, content, user_id]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPostList = async () => {
  try {
    return await myDataSource.query(` 
        SELECT
          posts.id, 
          posts.title,
          posts.user_id, 
          posts.content, 
          users.id, 
          users.profile_image
        FROM posts join users on posts.user_id = users.id`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserPostList = async (user_id) => {
  try {
    const dataUsers = await myDataSource.query(`
      SELECT
          users.id as userId,
          users.profile_image as userProfileImage
      FROM users
      WHERE users.id = ${user_id};`
    );
    const dataPosts = await myDataSource.query(`
      SELECT 
          posts.id as postingId,
          posts.title as postingImageUrl,
          posts.content as postingContent
      FROM posts
      WHERE user_id = ${user_id};`
    );
    return [dataUsers, dataPosts];
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const modifyPost = async (post_id, content) => {
  try {
    await myDataSource.query(`
      UPDATE posts
      SET content = ?
      WHERE id = ${post_id}`,
      [content]
    );
    const [modifyData] = await myDataSource.query(`
      SELECT
        posts.content as postingContent,
        posts.user_id as userId,
        posts.id as postingId,
        posts.title as postingTitle,
        users.name as userName
      FROM posts join users on users.id = posts.user_id
      WHERE posts.id = ${post_id}`
    );
    return modifyData;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const removePost = async (post_id) => {
  try {
    return await myDataSource.query(`
      DELETE FROM posts
      WHERE posts.id = ${post_id}`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  getPostList,
  getUserPostList,
  modifyPost,
  removePost
};
