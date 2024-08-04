const Product = require('../../models/productModel');

const getProductCount = async (req, res) => {
    try {
        const count = await Product.countDocuments(); // Correctly counting documents
        console.log("Total Products Counted:", count); // Debug log
        res.json({ 
            success: true,
            error: false,
            data: count // Returning the count directly
        });
    } catch (error) {
        console.error("Error fetching product count:", error.message); // Error log
        res.status(500).json({ error: error.message });
    }
};

module.exports = getProductCount;