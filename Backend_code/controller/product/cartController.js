const addToCartModel = require('../../models/cartProduct'); // Ensure the path is correct

const clearCart = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false
            });
        }

        await addToCartModel.deleteMany({ userId });
        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { clearCart };