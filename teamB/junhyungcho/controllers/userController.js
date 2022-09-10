const { userService } = require("../services");

const getUserSignUp = async (req, res) => {
  try {
    const { first_name, last_name, age, email, password, profile_image } =
      req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Please write your Info" });
    }

    const user = await userService.getUserSignUp(
      first_name,
      last_name,
      age,
      email,
      password,
      profile_image
    );

    return res.status(201).json({ data: user });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserInfoWithPostings = async (req, res) => {
  try {
    let { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const postList = await userService.getUserInfoWithPostings(userId);

    return res.status(200).json({ data: postList });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const signIn = await userService.getUserSignIn(email, password);

    return res.status(200).json({ accessToken: signIn });
  } 
  catch (err) {
    return res.status(err.statusCode || 401).json({ message: err.message });
  }
};

module.exports = {
  getUserSignUp,
  getUserInfoWithPostings,
  getUserSignIn,
};
