const {
  DataSource,
  TypeORMError,
  CannotConnectAlreadyConnectedError,
} = require("typeorm");

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

const createUser = async (name, email, profileImage, hashPassword) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        profile_image,
        password
      ) VALUES (?, ?, ?, ?);`,
      [name, email, profileImage, hashPassword]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const userInfo = async (userId) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT
        users.id as userId,
        users.profile_image as userProfileImage
        FROM users 
        WHERE users.id = ${userId};`
    );

    const post = await appDataSource.query(
      `SELECT
        posts.id as poststingId,
        posts.content as postingContent
        FROM posts 
        WHERE user_id = ${userId}`
    );

    return [user, post];
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const [user] = await appDataSource.query(
    `
      SELECT *
      FROM users u
      WHERE u.email = ?
    `,
    [email]
  );
  return user;
};

module.exports = {
  createUser,
  userInfo,
  getUserByEmail
};
