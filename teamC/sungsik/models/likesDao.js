const db = require('./data-source');

const checkOverlap = async (userId, postId) => {
    return await db.database.query(
        `SELECT post_id FROM likes
         WHERE user_id = ?
         AND post_id = ?
        `, 
        [ userId, postId ]
    )
}

const likeThisPosting = async (userId, postId) => {
    return await db.database.query(
        `INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?)
        `,
        [ userId, postId ]
    )
}

const deleteThisPosting = async (userId, postId) => {
    return await db.database.query(
        `DELETE FROM likes
         WHERE user_id = ?
         AND post_id = ?
        `,
        [ userId, postId ]
    )
}

module.exports = {
    likeThisPosting,
    checkOverlap,
    deleteThisPosting
}