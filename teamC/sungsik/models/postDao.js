const db = require('./data-source')

const createNewPost = async (title, content, postingImage, userId) => {
    return await db.database.query(
        `INSERT INTO posts(
            title,
            content,
            posting_image,
            user_id
        ) VALUES (?, ?, ?, ?);
        `,
        [ title, content, postingImage, userId ]
    )
}

const postLookUp = async () => {
    return await db.database.query(
        `SELECT
            u.id as userId,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.posting_image as postingImageUrl,
            p.content as postingContent
         FROM posts as p
         INNER JOIN users as u
         ON p.user_id = u.id;
        `
    )
}

const postLookUpById = async (userId) => {
    const result = await db.database.query(
        `SELECT
            u.id as userId,
            u.profile_image as userProfileImage,
            p.id as postingId,
            p.posting_image as postingImageUrl,
            p.content as postingContent
        FROM posts as p
        INNER JOIN users as u
        ON p.user_id = u.id
        WHERE p.user_id = ?;
        `, [userId]
    )

    if (!result) {
        const error = new Error('NO_DATA');
        error.statusCode = 404;
        throw error;
    }

    return result;
}

const postUpdate = async ( postId, title, content, postingImage ) => {
    return await db.database.query(
        `UPDATE posts
         SET
            title = ?,
            content = ?,
            posting_image = ?
        WHERE posts.id = ?;
        `,
        [ title, content, postingImage, postId]
    )
}

const postDelete = async ( postId ) => {
    return await db.database.query(
        `DELETE FROM posts
         WHERE posts.id = ?;
       `, [ postId ]
    )
}

module.exports = {
    createNewPost,
    postLookUp,
    postLookUpById,
    postUpdate,
    postDelete
}