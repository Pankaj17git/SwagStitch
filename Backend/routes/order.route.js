const express = require('express');
const { getOrders, createOrder, getAllOrders } = require('../controllers/order.controller.js')
const router = express.Router();

router.get('/', getOrders)
router.get('/admin', getAllOrders)
// router.get('/:userId')
router.post('/', createOrder)

module.exports = router;