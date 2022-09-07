const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter")
const likesRouter = require("./likesRouter")

router.use ("/users", userRouter.router);
router.use ("/posts", postRouter.router);
router.use ("/likes", likesRouter.router);

module.exports = router;