const postService  = require('../services/postService');

const upload = async (req, res) => {
    try {
        const { title, description, cover_image, users_id } = req.body;

        if ( !title || !description || !cover_image || !users_id ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        const post = await postService.upload( title, description, cover_image, users_id );

        return res.status(201).json({ result: post });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
};

const list = async (req, res) => {
    try {
        const list = await postService.list();
        return res.status(200).json({ data: list });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const edit = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, description, cover_image, users_id } = req.body;

        if ( !postId || !title || !description || !cover_image || !users_id ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        const post = await postService.edit( postId, title, description, cover_image, users_id );
        return res.status(201).json({ result: post });
    } 
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const erase = async (req, res) => {
    try {
        const postId = req.params.postId;
        if ( !postId ) {
            return res.status(400).json({ message: "KEY_ERROR "});
        }
        await postService.erase( postId );
        return res.status(204).json({ message : "postingDeleted" });
    } 
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

module.exports = {
    upload,
    list,
    edit,
    erase,
}