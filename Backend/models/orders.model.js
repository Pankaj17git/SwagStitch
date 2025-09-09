const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: { type: Number, ref: "Product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shippingfee: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  paymentmethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"],
    default: "pending"
  }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;