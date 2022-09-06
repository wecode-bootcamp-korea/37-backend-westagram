const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');


router.post('/upload', postController.upload);
router.get('/all', postController.list);
router.patch('/edit/:postId', postController.edit);
router.delete('/erase/:postId', postController.erase);

module.exports = router;