const { DataSource } =require('typeorm');

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

database.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const createPost = async (title, content, userId) => {
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

const lookPosts = async () => {
    return await database.query(
        `SELECT * FROM posts;
        `
    );
};

const lookPostsByUser = async ( userId ) => {
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

const updatePost = async ( title, postId) => {
    return await database.query(
        `UPDATE posts SET
            posts.title = ?
        WHERE posts.id = ? 
        `,
        [title, postId]
    )
}

const afterUpdatePost = async (postId) => {
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

const removePost = async (postId) => {
    return await database.query (
        `DELETE
        FROM posts
        WHERE posts.id = ?
        `,
        [postId]
    );
}

module.exports = {
    createPost,
    lookPosts,
    lookPostsByUser,
    updatePost,
    afterUpdatePost,
    removePost,
}