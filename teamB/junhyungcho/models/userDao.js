//데이터베이스와 연결, initialize 객체를 호출

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
    console.log("User data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    database.destroy();
  });

const createUser = async (
  first_name,
  last_name,
  age,
  email,
  password,
  profile_image
) => {
  try {
    const user = await database.query(
      `INSERT INTO users(
                 first_name,
                 last_name,
                 age,
                 email,
                 password,
                 profile_image
                ) 
                VALUES (?, ?, ?, ?, ?, ?);
            `,
      [first_name, last_name, age, email, password, profile_image]
    );

    return user;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserIdImage = async (userId) => {
  try {
    const [user] = await database.query(
      `SELECT
                users.id AS userId, 
                users.profile_image AS userProfileImage
            FROM users WHERE users.id = ?`,
      [userId]
    );
    return user;
  } catch (err) {
    const error = new Error("INBALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserPosting = async (userId) => {
  return await database.query(
    `SELECT 
            posts.id AS postingId, 
            posts.cover_image AS postingImageUrl, 
            posts.description AS postingContent
        FROM posts WHERE ${userId} = users_id`
  );
};

const getUserSignIn = async (email) => {
  return await database.query(
    `SELECT 
            *
        FROM users
        WHERE users.email = ?
        `,
    [email]
  );
};

module.exports = {
  createUser,
  getUserIdImage,
  getUserPosting,
  getUserSignIn,
};
