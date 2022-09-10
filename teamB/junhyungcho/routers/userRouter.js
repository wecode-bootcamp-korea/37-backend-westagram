const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/signup", userController.getUserSignUp);
router.get("/signin", userController.getUserSignIn);
router.get("/info", userController.getUserInfoWithPostings);

module.exports = router;
