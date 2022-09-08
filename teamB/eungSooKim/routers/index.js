const express = require("express");

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
