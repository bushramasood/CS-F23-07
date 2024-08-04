const vendorProductModel = require('../../models/vendorModel');
const uploadProductPermission = require("../../helpers/permission");

const vendorUploadProduct = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const productData = { ...req.body, vendor: sessionUserId };
        const product = new vendorProductModel(productData);
        await product.save();
        res.status(201).json({
            message: "Product uploaded successfully",
            success: true,
            error: false,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};

const vendorGetProducts = async (req, res) => {
    try {
        const products = await vendorProductModel.find({ vendor: req.userId }).sort({ createdAt: -1 });
        res.json({
            message: "All Vendor Products",
            success: true,
            error: false,
            data: products
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};

const vendorUpdateProduct = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const { productId, ...resBody } = req.body;
        const updatedProduct = await vendorProductModel.findByIdAndUpdate(productId, resBody, { new: true });

        res.json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};

const vendorDeleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await vendorProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Error deleting product',
            success: false,
            error: true
        });
    }
};

module.exports = {
    vendorUploadProduct,
    vendorGetProducts,
    vendorUpdateProduct,
    vendorDeleteProduct
};
