const express = require("express");
const { asyncWrap } = require('../middlewares/asyncWrap')
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post('/signup', asyncWrap(userController.signUp));
userRouter.post('/singin', asyncWrap(userController.signIn));

module.exports = { userRouter };