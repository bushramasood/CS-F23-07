const CartProduct = require("../../models/cartProduct");
const ProductModel = require("../../models/productModel");

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity = 1, customOrderText } = req.body;
        const currentUser = req.userId;

        // Check if the product exists and fetch its details
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        // Check if the product is already in the cart
        const cartEntry = await CartProduct.findOne({
            productId: productId,
            userId: currentUser
        });

        if (cartEntry) {
            return res.status(409).json({
                message: "Product already in cart",
                success: false,
                error: true
            });
        }

        // Check if enough stock is available
        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Not enough stock available",
                success: false,
                error: true
            });
        }

        // Reduce stock
        product.stock -= quantity;
        await product.save();

        // Proceed to add to cart
        const payload = {
            productId,
            quantity,
            customOrderText, // Include customOrderText in the payload
            userId: currentUser,
        };

        const newAddToCart = new CartProduct(payload);
        const savedProduct = await newAddToCart.save();

        return res.json({
            data: savedProduct,
            message: "Product successfully added to cart",
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Add to cart error:", err);
        return res.status(500).json({
            message: "Server error: " + (err.message || err),
            success: false,
            error: true
        });
    }
};

module.exports = addToCartController;
