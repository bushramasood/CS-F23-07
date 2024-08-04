const Product = require('../../models/productModel');

const getOutOfStockProductCount = async (req, res) => {
    try {
        const products = await Product.find({});
        let outOfStock = 0;
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock += 1;
            }
        });
        console.log("Total Out of stock product Counted:", outOfStock); // Debug log
        res.json({ 
            success: true,
            error: false,
            data: outOfStock // Returning the count directly
        }); 
    } catch (error) {
        console.error("Error fetching Out of Stock count:", error.message); // Error log
        res.status(500).json({ error: error.message });
    }
};

module.exports = getOutOfStockProductCount;