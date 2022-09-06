//데이터베이스와 연결, initialize 객체를 호출

const { DataSource } = require('typeorm');
const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

database
    .initialize()
    .then(() => {
        console.log("Post data Source has been initialized!");
    })
    .catch((err) => {
        console.error('Error occurred during Data Source initialization', err);
        database.destroy();
    });

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
            [ title, description, cover_image, users_id ]
        );

        return post;
    }
    catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getAllPost = async () => {
    try {
        return await database.query(
        `SELECT * FROM posts`,
        );
    }
    catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
};

const editPost = async ( postId, title, description, cover_image, users_id ) => {
    try {
        await database.query(
            `UPDATE posts 
            SET title = ?,
                description = ?,
                cover_image = ?,
                users_id = ?
            WHERE id = ${postId}`,
            [ title, description, cover_image, users_id ]
        );

        return await database.query(
            `SELECT
                p.users_id as userId,
                p.id as postingId,
                p.cover_image as userName,
                p.title as postingTitle,
                p.description as postingContent
            FROM posts p
            WHERE p.id like ${postId};`
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const deletePost = async ( postId ) => {
    try {
        return await database.query(
        `DELETE FROM posts
        WHERE posts.id = ${postId};`
        )
    }
    catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createPost,
    getAllPost,
    editPost,
    deletePost,
}