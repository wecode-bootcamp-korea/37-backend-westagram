const express = require('express');
const { userController } = require('../controllers');

const router = express.Router(); 

router.post('/signup', userController.signUp);
router.get('/post/:userId', userController.postList);

module.exports = router;