const mongoose = require('mongoose');

const addToCartSchema = mongoose.Schema({
    productId: {
        ref: 'product',
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId if your product IDs are MongoDB ObjectIds
    },
    quantity: Number,
    userId: {
        type: String,
        required: true // Assuming you require a userId to associate with each cart item
    },
    customOrderText: { // Add this field to store custom order details
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Static method to clear cart
addToCartSchema.statics.clearCart = function(userId) {
    return this.deleteMany({ userId: userId }); // This will delete all entries for the given userId
};

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;
