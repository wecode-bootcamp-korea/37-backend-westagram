const express =require('express');
const userController =
require('../controllers/userControllers');

const router = express.Router();

router.post(``, userControllers.signUp);

module.exports = {
    router    
}