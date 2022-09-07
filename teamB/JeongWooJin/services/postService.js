const postDao = require('../models/postDao')

const enrollPost = async (title, content, user_id) => {

      const creatPost = await postDao.createPost(
      title,
      content,
      user_id
      );
        return creatPost;
      };
  
const postLookup = async () => {
      const lookUpPost = await postDao.lookUpPost();
        return lookUpPost;
      };

const modifyPost = async (postId, content) => {
  const postModify = await postDao.modifyPost(postId, content);
  return postModify;
  };

const deletePost = async (postId) => {
  const postDelete = await postDao.deletePost(postId);
  return postDelete;
  };
  

  module.exports = {
      enrollPost, postLookup, modifyPost, deletePost
  }