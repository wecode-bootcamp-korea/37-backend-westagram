const postService = require("../services/postService");

const search = async (req, res) => {
    try {
        const result = await postService.search();
        res.status(200).json({ data:result });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const postUp = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;
        if ( !title || !content ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        await postService.postUp( title, content, userId );
        res.status(201).json({ message: "POSINGUP_SUCCESS" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const postEdit = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content, userId } = req.body;
        if ( !postId || !title || !content || !userId ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        const result = await postService.postEdit( postId, title, content, userId );
        res.status(200).json({ data: result[0] });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const postDelete = async (req, res) => {
    try {
        const postId = req.params.postId;
        if ( !postId ) {
            return res.status(400).json({ message: "KEY_ERROR "});
        }
        await postService.postDelete( postId );
        res.status(200).json({ message : "postingDeleted" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}


module.exports = {
    search,
    postUp,
    postEdit,
    postDelete
}