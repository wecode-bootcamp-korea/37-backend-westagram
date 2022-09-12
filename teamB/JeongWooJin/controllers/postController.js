const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPost(title, content, user_id);
    return res.status(201).json({
      message: "POST_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostList = async (req, res) => {
  try {
    const result = await postService.getPostList();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modifyPost = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const { content } = req.body;
    const result = await postService.modifyPost(postId, content);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;
    await postService.deletePost(postId);
    return res.status(200).json({ message: "postingDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPostList,
  modifyPost,
  deletePost
};
