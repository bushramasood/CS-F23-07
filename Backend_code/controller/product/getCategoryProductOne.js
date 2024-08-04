const productModel = require("../../models/productModel");
const vendorProductModel = require("../../models/vendorModel");

const getCategoryProduct = async (req, res) => {
    try {
        const productCategories = await productModel.distinct("category");
        const vendorProductCategories = await vendorProductModel.distinct("category");

        // Combine and deduplicate categories from both models
        const allCategories = Array.from(new Set([...productCategories, ...vendorProductCategories]));

        console.log("categories", allCategories);

        // Array to store one product from each category
        const productByCategory = [];

        for (const category of allCategories) {
            const product = await productModel.findOne({ category });
            const vendorProduct = await vendorProductModel.findOne({ category });

            // Choose the product to add to the result
            const chosenProduct = product || vendorProduct;
            if (chosenProduct) {
                productByCategory.push(chosenProduct);
            }
        }

        res.json({
            message: "category product",
            data: productByCategory,
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

module.exports = getCategoryProduct;
