const Order = require('../../models/orderModel'); // Path might differ based on your setup

async function allOrders(req, res) {
    try {
        const orders = await Order.find().populate('user', 'email');
        console.log(orders); 
        res.json({
            message: "All orders fetched successfully",
            data: orders,
            success: true,
            error: false
        });


    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred",
            success: false,
            error: true
        });
    }
}

module.exports = allOrders;
