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

  /*********************************************************** */

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

const getPostList = async ( postId) => {

	return await myDataSource.query(
		`SELECT *
     	 FROM posts
		`,);
};

const getUserPost = async ( userId ) => {

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

const getPostEdit = async ( postId, content, title ) => {

	await myDataSource.query(
		`UPDATE posts 
		SET title = ?, content = ? 
		WHERE id = ?;`,
		[title, content, postId]
	  );
	
	const postResulted = await myDataSource.query(
		`SELECT *
		FROM posts
		WHERE id = ${postId};
		`);

	return postResulted;
};

const getPostDlt = async ( postId) => {

	return await myDataSource.manager.query(
		`DELETE FROM posts
		WHERE id = ${postId}`
	);
};

const getPostLike = async ( postId, userId) => {

	return await myDataSource.query(
		`INSERT INTO likes(user_id, post_id)
		values(?, ?);`,
		[userId, postId]
	);
};


module.exports = {
    createPost, getPostList, getUserPost, getPostEdit, getPostDlt, getPostLike
}