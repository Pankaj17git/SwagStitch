const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const userSignUp = async (req, res) => {

  let check = await User.findOne({ email: req.body.email });
  const saltRounds = 10;

  if (check) {
    return res.status(404).json({ success: false, error: "Existng user with the same email Please use a different one" })
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const plainPassword = req.body.password;

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token: token, user: user })
}

const userLogin = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password)
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token: token, user: user });
    }
    else {
      res.json({ success: false, error: 'Wrong Password!' })
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id!" })
  }
}

const addAddress = async (req, res) => {
  try {
    const newAddress = req.body;
    let { id } = req.params;

    let user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateAddress = async (req, res) => {
  try {
    let { id, addressId } = req.params;
    const updatedFields = req.body;

    let user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    Object.assign(address, updatedFields);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.send(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteAddress = async (req, res) => {
  try {
    let { id, addressId } = req.params;
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  userSignUp, userLogin,
  addAddress, updateAddress,
  deleteAddress, getAddress
}