const addToCartModel = require("../../models/cartProduct");
const ProductModel = require("../../models/productModel");
const VendorProductModel = require("../../models/vendorModel");

const updateAddToCartProduct = async (req, res) => {
    try {
        const { _id, quantity } = req.body;  // Assumed _id is the cart item ID and quantity is the new desired quantity

        // Retrieve the current cart item
        const cartItem = await addToCartModel.findById(_id);
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found",
                error: true,
                success: false
            });
        }

        // Retrieve the associated product to update the stock
        let product = await ProductModel.findById(cartItem.productId);
        let isVendorProduct = false;

        // If the product is not found in the main product model, check the vendor product model
        if (!product) {
            product = await VendorProductModel.findById(cartItem.productId);
            isVendorProduct = !!product;
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        const currentQuantity = cartItem.quantity;
        const quantityChange = quantity - currentQuantity;  // Calculate the change in quantity

        // Check if enough stock is available for increasing the quantity
        if (quantityChange > 0 && product.stock < quantityChange) {
            return res.status(400).json({
                message: "Not enough stock available",
                error: true,
                success: false
            });
        }

        // Update the product stock
        product.stock -= quantityChange;
        await product.save();

        // Update the cart item with the new quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({
            message: "Cart product updated successfully",
            data: cartItem,
            error: false,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
