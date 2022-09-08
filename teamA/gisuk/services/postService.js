const postDao = require("../models/postDao");

const search = async () => {
    return await postDao.postSearch();
}

const postUp = async ( title, content, userId ) => {
    const createPost = await postDao.createPost(
        title,
        content,
        userId
    );
    return createPost;
};

const postEdit = async ( postId, title, content, userId ) => {
    const postEdit = await postDao.postEdit(
        postId,
        title,
        content,
        userId
    );
    return postEdit;
}

const postDelete = async ( postId ) => {
    const postDelete = await postDao.postDelete(
        postId
    );
    return postDelete;
}


module.exports = {
    search,
    postUp,
    postEdit,
    postDelete
}
