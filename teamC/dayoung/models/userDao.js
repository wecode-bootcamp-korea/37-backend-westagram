const myDataSource = require("./DataSource");

const createUser = async ( email, password ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO users(
		    email,
		    password
		) VALUES (?, ?);
		`,
		[ email, password ]

	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser
}