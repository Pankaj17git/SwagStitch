const express = require('express');
const {getOrders, createOrder} = require('../controllers/order.controller.js')
const router = express.Router();

router.get('/', getOrders)
// router.get('/:userId')
router.post('/', createOrder)

module.exports = router;