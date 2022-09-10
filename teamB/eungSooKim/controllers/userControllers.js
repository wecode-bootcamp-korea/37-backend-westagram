const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, password, profileImage);
    return res.status(201).json({
      message: "userCreated",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const token = await userService.signIn(email, password);
    console.log(token)
    res.status(200).json({ accessToken: token});
  }catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

  
}

const getPostsUser = async (req, res) => {
  try {
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    return await userService.getPostsUser(userId);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = {};
    let [userInfo] = await userService.getUserPosts(userId);
    let postsInfo = await userService.getPostsUser(userId);

    result.userId = userInfo.userId;
    result.userProfileId = userInfo.userProfileId;
    result.postings = postsInfo;

    return await res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  getUserPosts,
  getPostsUser,
};
