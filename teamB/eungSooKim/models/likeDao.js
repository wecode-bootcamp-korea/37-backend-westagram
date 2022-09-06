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

const likePost = async (postId, userId) => {
  try {
    return await database.query(
      `INSERT INTO likes(
              post_id,
              user_id
          ) VALUES (?, ?);
          `,
      [postId, userId]
    );
  } catch (err) {
    const error = new Error("동일한 글에 추천을 할 수 없습니다");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  likePost,
};
