const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    shippingInfo: {
        name: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phoneNo: String
    },
    paymentInfo: {
        status: {
            type: String,
            default: 'pending'
        }
    },
    totalPrice: Number,
    paidAt: Date,
    status: {
        type: String,
        default: 'processing'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
