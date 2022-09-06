const express = require('express'); //통신모듈에서만 쓰임
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);

module.exports = {
	router
}