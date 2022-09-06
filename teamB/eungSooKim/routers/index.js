const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

const postRouter = require("./postRouter");
router.use("/posts", postRouter.router);

const likeRouter = require("./likeRouter");
router.use("/likes", likeRouter.router);

module.exports = router;
