const express = require('express');
const { userController } = require('../controllers');

const router = express.Router(); //app, 즉 express()의 router 기능만 구현하는 코드

router.post('/signup', userController.signUp); // 발행된 토큰을 확인하는 곳
router.get('/post/:userId', userController.postList);

module.exports = router;