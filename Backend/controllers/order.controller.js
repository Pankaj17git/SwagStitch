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

const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const userId  = req.query;
    const orders = await Order.find(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No order found" });
    }

    res.status(200).json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
}

module.exports = {
  getOrders, createOrder, getAllOrders
}