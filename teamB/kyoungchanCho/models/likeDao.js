const database = require('./DataSource')

const postLikes = async (postId, userId) => {
    return await database.query(
        `INSERT INTO likes (
            user_id,
            post_id
        ) VALUES ( ?, ? );
        `,
        [ userId, postId ]
    )
}

module.exports = {
    postLikes,
}