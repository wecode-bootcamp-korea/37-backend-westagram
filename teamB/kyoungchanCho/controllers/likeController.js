const { likeService } = require('../services')

const postLikes = async (req, res) => {
    const { postId, userId } = req.body
    const result = await likeService.postLikes(postId, userId)

    return res.status(201).json({ likeResult : result});
}

module.exports = {
    postLikes,
}