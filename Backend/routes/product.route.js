const express = require("express");
const Product = require('../models/product.model.js')
const {addProduct, removeProduct, getAllProducts} = require('../controllers/product.controller.js')
const router = express.Router();


router.get('/', getAllProducts)

router.post('/addproduct', addProduct);

router.delete('/removeproduct/:id', removeProduct);


module.exports = router; 