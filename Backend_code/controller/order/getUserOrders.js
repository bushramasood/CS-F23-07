const Order = require('../../models/orderModel');

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false
      });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({
        message: 'No orders found for this user',
        success: false
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
      message: 'User Orders successfully retrieved'
    });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getUserOrders;