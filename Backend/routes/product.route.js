const express = require("express");
const Product = require('../models/product.model.js')
const {addProduct, removeProduct, getAllProducts, getNewCollections, getPopularInWomen} = require('../controllers/product.controller.js')
const router = express.Router();

//get all the products
router.get('/', getAllProducts);
router.get('/newcollections', getNewCollections);
router.get('/popularinwomen', getPopularInWomen)


//add a new product
router.post('/addproduct', addProduct);

//delete a porduct from the data
router.delete('/removeproduct/:id', removeProduct);


module.exports = router; 