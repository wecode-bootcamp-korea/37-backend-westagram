const db = require('./data-source')

const checkOverlap = async ( email ) => {
    return await db.database.query(    
        `SELECT * FROM users
         WHERE users.email = ?;
        `,[ email ]
    )
}

const createUser = async (name, email, profileImage, password) => {
    return await db.database.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profileImage, password]
    );
}

module.exports = {
    checkOverlap,
    createUser
}