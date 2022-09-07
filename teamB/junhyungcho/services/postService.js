//실제 로직이 돌아가는 파일
const { postDao } = require('../models/')

const upload = async ( title, description, cover_image, users_id ) => {
    const upload = await postDao.createPost(
        title,
        description,
        cover_image,
        users_id
    );

    return upload;
}

const list = async () => await postDao.getAllPost();

const update = async ( postId, title, description, cover_image, users_id ) => {
    const edit = await postDao.updatePost(
        postId,
        title,
        description,
        cover_image,
        users_id,
    );

    return update
}

const erase = async ( postId ) => {
    return await postDao.deletePost(postId);
}

module.exports = {
    upload,
    list,
    update,
    erase,
}