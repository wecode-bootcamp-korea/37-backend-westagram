const likeService = require("../services/likeService");

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "Invalid postId or userId" });
    }

    await likeService.likePost(postId, userId);
    return res.status(201).json({
      message: "likeCreated",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  likePost,
};
