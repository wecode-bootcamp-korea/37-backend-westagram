const { DataSource } = require("typeorm");

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

database
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const titleAndContent = async (title, content, userId) => {
  try {
    return await database.query(
      `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
		`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const allPosts = async () => {
  try {
    return await database.query(
      `SELECT posts.user_id AS userId,
                users.profile_image AS userProfileImage,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.profile_image AS potingImageUrl,
                posts.content As postingContent
         FROM users JOIN posts ON users.id = posts.user_id`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const modify = async (title, content, postId) => {
  try {
    await database.query(
          `UPDATE posts
         SET title = ?,
             content = ?
         WHERE posts.id= ?
        `,
    [title, content, postId]
  
    );
    return await database.query(
          `SELECT users.id AS userId,
                users.name AS userName,
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
         FROM users JOIN posts ON posts.user_id = users.id AND posts.id = ?
         `,
         [postId]
    );
    
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  titleAndContent,
  allPosts,
  modify,
};
