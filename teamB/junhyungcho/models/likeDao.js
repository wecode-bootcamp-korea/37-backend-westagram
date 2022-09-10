const { database } = require("./dataSource");

const createLike = async (userId, postId) => {
  try {
    return await database.query(
      `INSERT INTO likes(
                users_id,
                posts_id
            ) VALUES (?, ?);
            `,
      [userId, postId]
    );
  } 
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createLike,
};
