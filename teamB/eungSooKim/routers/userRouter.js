const express =require('express');
const userController =
require(`../controllers/userController`);

const router = express.Router();

router.post(`/signup`, userControllers.singUp);

module.exports = {
    router    
}