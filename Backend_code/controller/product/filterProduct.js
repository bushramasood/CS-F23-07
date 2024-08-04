const productModel = require("../../models/productModel");
const vendorProductModel = require("../../models/vendorModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req.body.category || [];

        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        const vendorProducts = await vendorProductModel.find({
            category: {
                "$in": categoryList
            }
        });

        const combinedProducts = products.concat(vendorProducts);

        res.json({
            data: combinedProducts,
            message: "Filtered products",
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

module.exports = filterProductController;
