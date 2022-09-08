const database = require('./DataSource')

const postUser = async (name, email, profileImage, password) => {
    const user = await database.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
         ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profileImage, password]
    );
    return user;
};

const verifyUser = async (email, password) => {
    const [userEncryption] = await database.query(
        `SELECT
            id,
            email,
            password
        FROM users
        WHERE email = ?
        `,
        [email]
    );
    return userEncryption;
}

module.exports = {
    postUser,
    verifyUser,
}