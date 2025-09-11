const express = require('express');
const { userSignUp, userLogin, getAllUsers, addAddress, updateAddress, deleteAddress, getAddress } = require('../controllers/user.controller');
const router = express.Router();


// Creating Endpoints for registering the user
router.post('/signup', userSignUp);

//Endpoints for login
router.post('/login', userLogin)

//get all users
router.get('/', getAllUsers);

//Add Addresses 
router.get('/:id/addresses', getAddress)
router.post('/:id/addaddress', addAddress)
router.put('/:id/updateaddress/:addressId', updateAddress)
router.delete('/:id/removeaddress/:addressId', deleteAddress)

module.exports = router; 