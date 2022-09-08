const database = require('./DataSource')

const postPost = async (title, content, userId) => {
    return await database.query(
        `INSERT INTO posts(
        title,
        content,
        user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, userId ]
    );
}

const getPosts = async () => {
    return await database.query(
        `SELECT * FROM posts;
        `
    );
};

const getPostsByUser = async ( userId ) => {
    return await database.query(
        `SELECT
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM users
        JOIN posts ON users.id = posts.user_id
        WHERE users.id = ?
        `,
        [userId]
    );        
}

const patchPost = async ( title, postId) => {
    return await database.query(
        `UPDATE posts SET
            posts.title = ?
        WHERE posts.id = ? 
        `,
        [title, postId]
    )
}

const afterPatchPost = async (postId) => {
    return await database.query (
        `SELECT
            users.id AS userId,
            users.name AS userName,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM users
        JOIN posts ON posts.user_id = users.id
        WHERE posts.id = ?
        `,
        [postId]
    )
}

const deletePost = async (postId) => {
    return await database.query (
        `DELETE
        FROM posts
        WHERE posts.id = ?
        `,
        [postId]
    );
}

module.exports = {
    postPost,
    getPosts,
    getPostsByUser,
    patchPost,
    afterPatchPost,
    deletePost,
}