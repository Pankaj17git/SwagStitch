const User = require("../models/user.model");

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
  
}

module.exports = {
  addToCart,
}