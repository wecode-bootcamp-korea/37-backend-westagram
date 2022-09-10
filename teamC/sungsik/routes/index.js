const express = require("express");

const { userRouter } = require("./userRouter");
const { postRouter } = require("./postRouter")
const { likesRouter } = require("./likesRouter")

const router = express.Router();

router.use ("/users", userRouter);
router.use ("/posts", postRouter);
router.use ("/likes", likesRouter);

module.exports = router;    