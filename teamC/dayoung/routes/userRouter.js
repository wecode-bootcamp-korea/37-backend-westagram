//통신모듈은 ROUTER에서만 끝난다.
const express = require('express'); //통신모듈에서만 쓰임
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);

module.exports = {
	router
}