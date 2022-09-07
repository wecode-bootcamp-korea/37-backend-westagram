const likeDao = require('../models/likeDao')

const pushLikes = async (user_id, post_id ) => {
  const likePush = await likeDao.pushLikes(user_id, post_id );
  return likePush;
  };

  module.exports = {
    pushLikes
}