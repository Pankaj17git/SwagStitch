const Order = require('../models/orders.model.js')

const createOrder = async (req, res) => {
  try {
    const orderDetail = req.body;

    if (!orderDetail.userId || !orderDetail.items || orderDetail.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "userId and at least one item are required." 
      });
    }

    const order = new Order(orderDetail);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order, 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order.",
      error: error.message,
    });
  }
};

const getOrders = async() => {

}

module.exports = {
  getOrders, createOrder
}