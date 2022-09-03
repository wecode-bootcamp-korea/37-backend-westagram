 const express = require('express');
 const userController = require('../controllers/userController');

 const router = express.Router(); //app, 즉 express()의 router 기능만 구현하는 코드

 router.post('/signup', userController.signUp);

 module.exports = {
    router
 }