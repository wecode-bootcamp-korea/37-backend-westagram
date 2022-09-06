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

const signUp = async (name, email, password, profileImage) => {
  try {
    return await database.query(
      `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const userPosts = async (userId) => {
  try {
    const result = {};
    const rows = await database.query(
      `SELECT users.id AS userId,
            users.profile_image AS userProfileId
         FROM users WHERE users.id = ?`,
      [userId]
    );
    result.userId = rows[0].userId;
    result.userProfileId = rows[0].userProfileId;
    const postInfo = await database.query(
      `SELECT posts.id AS postingID, 
        posts.profile_image AS postingImageUrl, 
        posts.title AS postingContent FROM posts 
        WHERE ?  = posts.user_id`,
      [userId]
    );
    result.postings = postInfo;
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  signUp,
  userPosts,
};
