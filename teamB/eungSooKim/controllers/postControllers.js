const postService = require("../services/postService");

const writePost = async (req, res, err) => {
  try {
    const { title, content, userId } = req.body;


    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.writePost(title, content, userId);
    return res.status(201).json({
      message: "postingCreated",
    });
  } catch (err) {
    return await res
      .status(err.statusCode || 500)
      .json({ message: err.message });
  }
};

const getPostsList = async (req, res) => {
  try {
    const result = await postService.getPostsList();
    return await res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modifyPost = async (req, res) => {
  try {
    const { title, content, postId } = req.body;
    const result = await postService.modifyPost(title, content, postId);
    return await res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.deletePost(postId);
    return res.status(200).json({
      message: "postingDeleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  writePost,
  getPostsList,
  modifyPost,
  deletePost,
};
