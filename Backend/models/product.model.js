const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    new_price: {
      type: Number,
      required: true
    },
    old_price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;