const { database } = require("./data-source")
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
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  likePost,
};
