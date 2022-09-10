//실제 로직이 돌아가는 파일
const { postDao } = require("../models/");
const checkAffectedRows = require("../utils/checkAffectedRows");

const getPostAll = async (limit, offset) => {
  const range = await postDao.getAllPost(
    limit,
    offset,
  );

  return range;
}

const getPostUpload = async (title, description, cover_image, users_id) => {
  const upload = await postDao.createPost(
    title,
    description,
    cover_image,
    users_id
  );

  checkAffectedRows(upload);

  return upload;
};

const getPostUpdate = async (postId, title, description, cover_image, users_id) => {
  const edit = await postDao.updatePost(
    postId,
    title,
    description,
    cover_image,
    users_id
  );

  checkAffectedRows(edit);

  return edit;
};

const getPostDelete = async (postId) => {
  const deletePost = await postDao.deletePost(postId);

  checkAffectedRows(deletePost);

  return edit;
};

module.exports = {
  getPostUpload,
  getPostAll,
  getPostUpdate,
  getPostDelete,
};
