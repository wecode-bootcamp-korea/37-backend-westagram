const { database } = require("./dataSource");

const createPost = async (title, description, cover_image, users_id) => {
  try {
    const post = await database.query(
      `INSERT INTO posts(
            title,
            description, 
            cover_image, 
            users_id
            ) 
          VALUES (?, ?, ?, ?);
      `,
      [title, description, cover_image, users_id]
    );

    return post;
  } 
  catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getAllPost = async (limit, offset) => {
  try {
    return await database.query(
      `SELECT
          * 
        FROM posts
        ORDERS
        LIMIT ?
        OFFSET ?;
      `,
      [limit, offset]
    );
  } 
  catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const updatePost = async (
  postId,
  title,
  description,
  cover_image,
  users_id
) => {
  try {
    await database.query(
      `UPDATE posts 
        SET title = ?,
            description = ?,
            cover_image = ?,
            users_id = ?
        WHERE id = ?
      `,
      [title, description, cover_image, users_id, postId]
    );

    return await database.query(
      `SELECT
            p.users_id as userId,
            p.id as postingId,
            p.cover_image as userName,
            p.title as postingTitle,
            p.description as postingContent
        FROM posts p
        WHERE p.id like ?;
      `,
      [postId]
    );
  } 
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 400;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    return await database.query(
      `DELETE FROM posts
        WHERE posts.id = ?;
      `,
      [postId]
    );
  } 
  catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
};
