const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");


router.get("/:userId", userController.userPost);

router.post("/signup", userController.signUp);


module.exports = {
    router
}