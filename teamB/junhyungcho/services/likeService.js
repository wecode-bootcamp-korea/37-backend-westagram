const likeDao  = require("../models/likeDao");

const heart = async ( userId, postId ) => {
    const heart = await likeDao.pushHeart(
        userId,
        postId
    );
    
    return heart;
}


module.exports = {
    heart
}