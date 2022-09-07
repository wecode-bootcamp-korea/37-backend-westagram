const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');


router.post('/upload', postController.upload);
router.get('/all', postController.list);
router.patch('/update', postController.update);
router.delete('/erase', postController.erase);

module.exports = router;