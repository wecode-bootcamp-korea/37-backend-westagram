const { DataSource } = require('typeorm');

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
    
    const checkOverlap = async ( email ) => {
        try {
            return await database.query(
                `SELECT email FROM users
                 WHERE email = ?
                `,
                [ email ]
            )
        } catch (err) {
            const error = new Error("INVALID_DATA_INPUT")
            error.statusCode = 500;
            throw error;
        }
    }

    const createUser = async (name, email, profileImage, password) => {
        try {
            return await database.query(
                `INSERT INTO users(
                    name,
                    email,
                    profile_image,
                    password
                ) VALUES (?, ?, ?, ?);
                `,
                [name, email, profileImage, password]
            );
        } catch (err) {
            const error = new Error("INVALID_DATA_INPUT")
            error.statusCode = 500;
            throw error;
        };
    }

    module.exports = {
        checkOverlap,
        createUser
    }