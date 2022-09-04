const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeRouter");

router.use("/users", userRouter.router);

router.use("/post", postRouter.router);

router.use("/like", likeRouter.router);


module.exports = router