const appDataSource = require("../orm");

const userPost = async ( userId ) => {
    try {
        const [user] = await appDataSource.query(
            `SELECT
                users.id as userId,
                users.profile_image as userProfileImage
            FROM users
            WHERE users.id = ${userId};`,
        );
        const post = await appDataSource.query(
            `SELECT
                posts.id as postingId,
                posts.title as postingImageUrl,
                posts.content as postingContent
            FROM posts
            WHERE posts.user_id = ${userId};`,
        );
        return [user, post];
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
};

const signIn = async ( email ) => {
    try {
        const [result] = await appDataSource.query(
            `SELECT
                users.id,
                users.email,
                users.password
            FROM users
            WHERE users.email = "${email}";`
        );
        return result;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createUser = async ( name, email, hashPassword, profileImage ) => {
    try {
        return await appDataSource.query(
            `INSERT INTO users(
                name,
                email,
                password,
                profile_image
            ) VALUES (?, ?, ?, ?)
            `,
            [ name, email, hashPassword, profileImage ]
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
};


module.exports = {
    userPost,
    signIn,
    createUser
}