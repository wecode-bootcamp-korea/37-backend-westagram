const likeService = require("../services/likeService");

const likeAdd = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        if ( !userId || !postId ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        await likeService.likeAdd( userId, postId );
        res.status(201).json({ message: "Like_SUCCSES" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}


module.exports = {
    likeAdd
}