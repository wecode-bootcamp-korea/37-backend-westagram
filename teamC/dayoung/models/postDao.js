const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

const createPost = async ( title, content, userId ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO posts(
		    title,
            content,
            user_id
		) VALUES (?, ?, ?);
		`,
		[ title, content, userId ]

	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const DataPost = async ( postId) => {
	try {
		return await myDataSource.query(
		`SELECT *
     FROM posts
		`,
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};
const DataUserPost = async ( userId ) => {

	const postId = await myDataSource.query(
		`SELECT id, profile_image
		 FROM users
		 WHERE id = ${userId}
		`);
	
	const postResult = await myDataSource.query(
		`SELECT id as PostingId, content, title
		FROM posts
		WHERE user_id = "${userId}";
		`);
	return [postResult, postId];
};


module.exports = {
    createPost, DataPost, DataUserPost
}