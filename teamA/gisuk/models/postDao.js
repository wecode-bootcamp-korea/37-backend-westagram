const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
      appDataSource.destroy()
    })

const postSearch = async () => {
    try {
        return await appDataSource.query(
            `SELECT
                users.id as userId,
                users.profile_image as userProfileImage,
                posts.id as postingId,
                posts.title as postingTitle,
                posts.content as postingContent
            FROM posts INNER JOIN users on posts.user_id = users.id;`,
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createPost = async ( title, content, userId ) => {
    try {
        return await appDataSource.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);
            `,
            [ title, content, userId ]
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
};

const postEdit = async ( postId, title, content, userId ) => {
    try {
        await appDataSource.query(
            `UPDATE posts SET
                title = ?,
                content = ?,
                user_id = ?
            WHERE id = ${postId}`,
            [ title, content, userId ]
        );
        return await appDataSource.query(
            `SELECT
                users.id as userId,
                users.name as userName,
                posts.id as postingId,
                posts.title as postingTitle,
                posts.content as postingContent
            FROM posts INNER JOIN users on users.id = posts.user_id 
            WHERE posts.id like ${postId};`,
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const postDelete = async ( postId ) => {
    try {
        return await appDataSource.query(
            `DELETE FROM posts
            WHERE posts.id = ${postId}`
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    postSearch,
    createPost,
    postEdit,
    postDelete
}