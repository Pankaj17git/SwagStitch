const express = require('express');
const { addToCart, removeFromCart, getAllCartItems, clearCart } = require('../controllers/cart.controller');
const fetchUser = require('../middleware/auth.middleware')
const router = express.Router();

router.post('/', fetchUser, getAllCartItems)
router.post('/add', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);
router.patch('/clearcart', clearCart);


module.exports = router