const { likeService } = require("../services/");

const heart = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await likeService.heart(userId, postId);
    res.status(201).json({ message: "likeCreated" });
  } 
  catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  heart,
};
