const likeDao = require('../models/likeDao')

const addLike = async (user_id, post_id) => {

    const createLike = await likeDao.addLike(
        user_id,
        post_id
    );
    return createLike;
}

module.exports = {
    addLike
}