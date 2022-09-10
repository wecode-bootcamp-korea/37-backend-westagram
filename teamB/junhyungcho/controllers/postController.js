const { postService } = require("../services/");

const getPostUpload = async (req, res) => {
  try {
    const { title, description, cover_image, users_id } = req.body;

    if (!title || !description || !cover_image || !users_id)
      return res.status(400).json({ message: "KEY_ERROR" });

    const post = await postService.getPostUpload(
      title,
      description,
      cover_image,
      users_id
    );

    return res.status(201).json({ result: post });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    const list = await postService.getPostAll(+limit, +offset);
    return res.status(200).json({ data: list });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostUpdate = async (req, res) => {
  try {
    const { title, description, cover_image, users_id, postId } = req.body;

    if (
      !postId ||
      !title ||
      !description ||
      !cover_image ||
      !users_id ||
      !postId
    )
      return res.status(400).json({ message: "KEY_ERROR" });

    const post = await postService.getPostUpdate(
      postId,
      title,
      description,
      cover_image,
      users_id,
      postId
    );

    return res.status(201).json({ result: post });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostDelete = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ message: "KEY_ERROR " });

    await postService.getPostDelete(postId);

    return res.status(204).json({ message: "postingDeleted" });
  } 
  catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getPostUpload,
  getPostAll,
  getPostUpdate,
  getPostDelete,
};
