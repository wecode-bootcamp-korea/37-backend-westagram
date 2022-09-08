const myDataSource = require("./dataSource");

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

	return await myDataSource.query(
		`SELECT *
     	 FROM posts
		`,
	);
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

const DataPostEdit = async ( postId, content, title ) => {

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

const DataPostDlt = async ( postId) => {

	return await myDataSource.manager.query(
		`DELETE FROM posts
		WHERE id = ${postId}`
	);
};

const DataPostLike = async ( postId, userId) => {

	return await myDataSource.query(
		`INSERT INTO likes(user_id, post_id)
		values(?, ?);`,
		[userId, postId]
	);
};


module.exports = {
    createPost, DataPost, DataUserPost, DataPostEdit, DataPostDlt, DataPostLike
}