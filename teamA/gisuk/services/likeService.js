const likeDao = require("../models/likeDao");

const likeAdd = async ( userId, postId ) => {
    const likeAdd = await likeDao.likeAdd(
        userId,
        postId
    );
    return likeAdd;
}


module.exports = {
    likeAdd
}