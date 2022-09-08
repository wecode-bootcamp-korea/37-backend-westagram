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

const postsUser = async (req, res) => {
  try {
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    return await userService.postsUser(userId);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = {};
    let [userInfo] = await userService.userPosts(userId);
    let postsInfo = await userService.postsUser(userId);

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
  userPosts,
  postsUser,
};
