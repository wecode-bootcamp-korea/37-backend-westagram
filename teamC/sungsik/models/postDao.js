const { DataSource } = require("typeorm")

const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()

    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {    
        console.error("Error occurred during Data Source initilization", err);
        database.destroy()
    })

const createPost = async (title, content, postingImage, userId) => {
    return await database.query(
        `INSERT INTO posts(
            title,
            content,
            posting_image,
            user_id
        ) VALUES (?, ?, ?, ?);
        `,
        [ title, content, postingImage, userId]
    )
}

const postLookUp = async () => {
    return await database.query(
        `SELECT
            u.id as userId,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.posting_image as postingImageUrl,
            p.content as postingContent
         FROM posts as p
         INNER JOIN users as u
         ON p.user_id = u.id
        `
    )
}

const postLookUpById = async (userId) => {
    return await database.query(
        `SELECT
            u.id as userId,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.posting_image as postingImageUrl,
            p.content as postingContent
        FROM posts as p
        INNER JOIN users as u
        ON p.user_id = u.id
        WHERE p.user_id = ?
        `, [userId]
    )
}

const postUpdate = async ( postId, title, content, postingImage ) => {
    return await database.query(
        `UPDATE posts
         SET
            title = ?,
            content = ?,
            posting_image = ?
        WHERE posts.id = ?
        `,
        [ title, content, postingImage, postId]
    )
}

const postDelete = async ( postId ) => {
    return await database.query(
        `DELETE FROM posts
        WHERE posts.id = ?
       `, [ postId ]
    )
}

module.exports = {
    createPost,
    postLookUp,
    postLookUpById,
    postUpdate,
    postDelete
}