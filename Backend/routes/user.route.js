const express = require('express');
const { userSignUp, userLogin } = require('../controllers/user.controller');
const router = express.Router();


// Creating Endpoints for registering the user
router.post('/signup', userSignUp);

//Endpoints for login
router.post('/login', userLogin)

module.exports = router; 