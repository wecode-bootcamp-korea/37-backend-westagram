//routes/index.js

const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
router.use('/users', userRouter.router);
//userRouter.js 에 router 모듈을 불러와 작동시킨다.
//.use : 경로를 추가

module.exports = {
    router
 };