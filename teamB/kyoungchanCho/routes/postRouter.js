const express = require("express");
const { postController } = require('../controllers')

const router = express.Router();

router.post('', postController.writePost);
router.get('', postController.getPosts);
router.get('/users/posts/', postController.getPostsByUser);

module.exports = router;