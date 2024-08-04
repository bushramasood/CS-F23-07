const OrderModel = require('../../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingInfo, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400).json({ message: 'No order items provided', success: false });
            return;
        }

        const order = new OrderModel({
            user: req.userId, // Assuming userId is added by your authToken middleware
            orderItems,
            shippingInfo,
            totalPrice
        });

        const savedOrder = await order.save();
        
        res.status(201).json({ data: savedOrder, success: true, message: "Order created successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message || "An error occurred", success: false });
    }
};