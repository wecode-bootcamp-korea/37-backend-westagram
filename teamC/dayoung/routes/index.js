//route는 엔드포인트를 모으는 공간입니다.
const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter") //각자 파일에 들어가겠다
const postRouter = require("./postRouter");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);

module.exports = router
