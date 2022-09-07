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
  const postModify = await postDao.postModify(postId, content);
  console.log(postModify)
  return postModify;
  };


  module.exports = {
      enrollPost, postLookup, modifyPost
  }