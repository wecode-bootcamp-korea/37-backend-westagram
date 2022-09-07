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
    const post = await database.query(
        `INSERT INTO posts(
        title,
        content,
        user_id
        ) VALUES (?, ?, ?);
        `,
        [ title, content, userId ]
    );
    return post;
}

const lookPosts = async () => {
    return await database.query(
        `SELECT * FROM posts;
        `
    )
};

const lookPostsByUser = async () => {
    return await database.query(
        `SELECT
            users.id AS userId,
            users.profile_image AS userProfileImage
            posts.id AS postingId,
            posts.title AS postTitle,
            posts.content AS postingContent
        FROM users
        JOIN posts ON users.id = posts.user_id
        `
    );        
}

module.exports = {
    createPost,
    lookPosts,
    lookPostsByUser,
}