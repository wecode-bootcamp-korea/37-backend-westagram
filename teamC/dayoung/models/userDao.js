const myDataSource = require("./dataSource");

const createUser = async ( name, email, password, profileImage) => {
	console.log( name, email, password, profileImage);
	try {
		return await myDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, password, profileImage ]

	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const checkUser = async ( email ) => {
	try {
		const [user] = await myDataSource.query(
		`SELECT id, password
		FROM users
		where email = "${email}";
		`,
	  );

	  return user;
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser, checkUser
}