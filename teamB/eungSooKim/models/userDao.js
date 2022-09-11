const { database } = require("./data-source");

const signUp = async (name, email, hashedPassword, profileImage) => {
  try {
    return await database.query(
      `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
      [name, email, hashedPassword, profileImage]
    );
  } catch (err) {
    const error = new Error("duplicated email");
    error.statusCode = 500;
    throw error;
  }
};

const signIn = async (email) =>{
  try {
        const result = await database.query(
      `SELECT 
      users.id AS id,
      users.email AS email,
      users.password AS password
      FROM users WHERE email = ?
      `,
      [email]
    );
    
    return await result;
  }
  
  catch (err) {
    const error = new Error("EMAIL DOES NOT EXIST OR INVALID");
    error.statusCode = 500;
    throw error;
  }
}

const getUserPosts = async (userId) => {
  try {
    return await database.query(
      `SELECT users.id AS userId,
            users.profile_image AS userProfileId
         FROM users WHERE users.id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPostsUser = async (userId) => {
  try {
    return await database.query(
      `SELECT posts.id AS postingID, 
        posts.profile_image AS postingImageUrl, 
        posts.title AS postingContent FROM posts 
        WHERE ?  = posts.user_id`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  signUp,
  signIn,
  getUserPosts,
  getPostsUser,
};
