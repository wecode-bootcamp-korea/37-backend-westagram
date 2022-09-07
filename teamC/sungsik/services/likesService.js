const likesDao = require('../models/likesDao')

const likePost = async (userId, postId) => {

    const checkOverlap = await likesDao.checkOverlap(userId, postId);

    if (checkOverlap.length !== 0) {
        console.log(checkOverlap)
        const error = new Error('DATA_OVERLAPED');
        error.statusCode = 400;
        throw error;
    }

    const likeThisPosting = await likesDao.likeThisPosting( userId, postId )
}

const deleteLikes = async () => {
    const deleteThisPosting = await likesDao.deleteThisPosting()

    return deleteThisPosting
}

module.exports = {
    likePost,
    deleteLikes
}