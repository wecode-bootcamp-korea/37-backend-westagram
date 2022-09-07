const express = require("express");
const asyncWrap = require('../errorHandler/asyncWrap')
const userController = require("../controllers/userController");

const router = express.Router();

router.post('/signup', asyncWrap.asyncWrap(userController.signUp));

module.exports = {
    router
}