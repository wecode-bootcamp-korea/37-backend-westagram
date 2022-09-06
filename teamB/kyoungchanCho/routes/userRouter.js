const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

//router.get('', userController.getUser);
router.post('/signup', userController.signUp);

module.exports = router;