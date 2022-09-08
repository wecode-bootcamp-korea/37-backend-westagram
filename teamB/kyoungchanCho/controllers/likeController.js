const { likeService } = require('../services')

const createLikes = async (req, res) => {
    const { postId, userId } = req.body
    const result = await likeService.createLikes(postId, userId)

    return res.status(201).json({ likeResult : result});
}

module.exports = {
    createLikes,
}