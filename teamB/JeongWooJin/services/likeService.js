const likeDao = require('../models/likeDao')

const createLikes = async (user_id, post_id ) => {
  const likePush = await likeDao.createLikes(user_id, post_id );
  return likePush;
  };

  module.exports = {
    createLikes
  }