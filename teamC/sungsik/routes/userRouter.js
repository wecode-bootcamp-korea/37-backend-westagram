const express = require("express");
const { asyncWrap } = require('../errorHandler/asyncWrap')
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post('/signup', asyncWrap(userController.signUp));

module.exports = { userRouter };