const express = require('express');
const { addToCart } = require('../controllers/cart.controller');
const fetchUser = require('../middleware/auth.middleware')
const router = express.Router();

router.post('/add', fetchUser, addToCart);

module.exports = router