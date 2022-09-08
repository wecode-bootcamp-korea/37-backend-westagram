const express = require('express');
const { likeController } = require('../controllers')

const router = express.Router();
router.post('', likeController.postLikes);

module.exports = router;