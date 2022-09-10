const postDao = require('../models/postDao')

const inputPost = async ( title, content, userId ) => {
  const createPost = await postDao.createPost( title, content, userId );

  return createPost;

 };

 const checkPost = async () => {

  const DataPost = await postDao.getPostList();

  return DataPost;

  };

  const CheckpostUser = async ( userId ) => {

    const DataUserPost = await postDao.getUserPost( userId );
    const result = {};
    result["userId"] = DataUserPost[1][0].id;
    result["userProfileImage"] =DataUserPost[1][0].profile_image;
    result["posting"] = DataUserPost[0];

    return result;

};
const inputPostEdit = async ( postId, content, title ) => {

  const DataPostEdit = await postDao.getPostEdit( postId, content, title );

  return DataPostEdit;


};

const inputPostDlt = async ( postId ) => {

  const DataPostEdit = await postDao.getPostDlt( postId );
    return DataPostEdit;
};

const inputPostLike = async ( postId, userId ) => {

  const DataPostEdit = await postDao.getPostLike(postId, userId);

  return DataPostEdit;
};

  
  module.exports = {
    inputPost, checkPost, CheckpostUser, inputPostDlt, inputPostDlt, inputPostLike
  }

 