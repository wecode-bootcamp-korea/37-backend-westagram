const { database } = require("./dataSource");

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
  } 
  catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserIdImage = async (userId) => {
  try {
    const [user] = await database.query(
      `SELECT
          users.id AS userId, 
          users.profile_image AS userProfileImage
        FROM users WHERE users.id = ?;
      `,
      [userId]
    );

    return user;
  } 
  catch (err) {
    const error = new Error("INBALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserPosting = async (userId) => {
  return await database.query(
    `SELECT 
        posts.id AS postingId, 
        posts.cover_image AS postingImageUrl, 
        posts.description AS postingContent
      FROM posts WHERE ${userId} = users_id
    `
  );
};

const checkUserEmail = async (email) => {
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
  checkUserEmail,
};
