const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter")
const postRouter = require("./postRouter")

router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;