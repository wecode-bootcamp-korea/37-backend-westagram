const { likeDao }  = require("../models/");

const heart = async ( userId, postId ) => {
    const heart = await likeDao.createLike(
        userId,
        postId
    );
    
    return heart;
}


module.exports = {
    heart
}