const { postService } = require('../services')

const writePost = async (req, res) => {
    const { title, content, userId } = req.body;
    const post = await postService.writePost(title, content, userId)

    return res.status(201).json({ result : post})
}

const getPosts = async (req, res) => {
    const posts = await postService.getPosts()
    return res.status(200).json({ result : posts})
}

const getPostsByUser = async (req, res) => {
    const posts = await postService.getPostsByUser()
    return res.status(200).json({ data : posts})
}


module.exports = {
    writePost,
    getPosts,
    getPostsByUser,
}