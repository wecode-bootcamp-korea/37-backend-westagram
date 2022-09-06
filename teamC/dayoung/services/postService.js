const postDao = require('../models/postDao')

const postInput = async ( title, content, userId ) => {
  const createPost = await postDao.createPost( title, content, userId );

  return createPost;

 };

 const postCheck = async () => {

  const DataPost = await postDao.DataPost();

  return DataPost;

  };

  const postUserCheck = async ( userId ) => {

    const DataUserPost = await postDao.DataUserPost( userId );
    const result = {};
    result["userId"] = DataUserPost[1][0].id;
    result["userProfileImage"] =DataUserPost[1][0].profile_image;
    result["posting"] = DataUserPost[0];

    return result;

};
const postEditCInput = async ( postId, content, title ) => {

  const DataPostEdit = await postDao.DataPostEdit( postId, content, title );

  return DataPostEdit;


};

const postDltInput = async ( postId ) => {

  const DataPostEdit = await postDao.DataPostDlt(
    postId
    );
    return DataPostEdit;
};

const postLikeInput = async ( postId, userId ) => {

  const DataPostEdit = await postDao.DataPostLike(postId, userId);

  return DataPostEdit;
};

  
  module.exports = {
    postInput, postCheck, postUserCheck, postEditCInput, postDltInput, postLikeInput
  }

 