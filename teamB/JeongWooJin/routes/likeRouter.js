const express = require('express');

const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/',likeController.pushLikes);


module.exports = {
	router
}