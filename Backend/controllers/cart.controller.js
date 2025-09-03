const User = require("../models/user.model");

const getAllCartItems = async (req, res) => {

  try {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addToCart = async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });

  if (!userData.cartData[req.body.itemId]) {
    userData.cartData[req.body.itemId] = 1;
  } else {
    userData.cartData[req.body.itemId] += 1;
  }

  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.json({ success: true, message: "Added" });
};

const removeFromCart = async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.json({ success: true, message: "Removed" });
}

module.exports = {
  addToCart, removeFromCart,
  getAllCartItems
}