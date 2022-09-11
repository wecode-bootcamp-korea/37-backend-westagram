const { database } = require("./data-source");

const writePost = async (title, content, userId2) => {
  try {
    return await database.query(
      `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
		`,
      [title, content, userId2]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPostsList = async () => {
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

const modifyPost = async (title, content, postId) => {
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

const deletePost = async (postId) => {
  try {
    await database.query(
      `DELETE FROM posts
         WHERE posts.id = ?
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
  writePost,
  getPostsList,
  modifyPost,
  deletePost,
};
