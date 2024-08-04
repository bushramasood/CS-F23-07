const productModel = require("../../models/productModel");
const vendorProductModel = require("../../models/vendorModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'i', 'g');

        // Search in main product model
        const mainProducts = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        // Search in vendor product model
        const vendorProducts = await vendorProductModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        // Merge the results
        const products = [...mainProducts, ...vendorProducts];

        res.json({
            data: products,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = searchProduct;
