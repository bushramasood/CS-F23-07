const productModel = require("../../models/productModel");
const vendorProductModel = require("../../models/vendorModel");

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        // Try to find the product in the main product model
        let product = await productModel.findById(productId);

        // If the product is not found in the main product model, check the vendor product model
        if (!product) {
            product = await vendorProductModel.findById(productId);
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: product,
            message: "Ok",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getProductDetails;
