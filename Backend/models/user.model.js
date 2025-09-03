const mongoose = require('mongoose');


const AddressSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
    match: /^[0-9]{6}$/,
  },
  phone: {
    type: Number,
    required: true,
    match: /^[0-9]{10}$/,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
})

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  addresses: [AddressSchema],
  cartData: {
    type: Object,
  },
  role: {
    type: String,
    default: "user"
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;