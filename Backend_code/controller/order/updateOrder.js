const Order = require('../../models/orderModel'); // Ensure this path is correct

const updateOrder = async (req, res) => {
    try {
        const { orderId, status, totalAmount } = req.body;

        const payload = {
            ...(status && { status }),
            ...(totalAmount && { totalAmount }),
        };

        const updatedOrder = await Order.findByIdAndUpdate(orderId, payload, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports =  updateOrder ;