const productModel = require("../../models/productModel");
const vendorProductModel = require("../../models/vendorModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body || req.query;
        
        // Fetch products from both productModel and vendorProductModel
        const products = await productModel.find({ category });
        const vendorProducts = await vendorProductModel.find({ category });

        // Combine both results
        const allProducts = [...products, ...vendorProducts];

        res.json({
            data: allProducts,
            message: "Products",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getCategoryWiseProduct;
