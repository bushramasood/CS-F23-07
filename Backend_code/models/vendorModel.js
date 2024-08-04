const mongoose = require('mongoose');

const vendorProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: [{ type: String, required: true }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('VendorProduct', vendorProductSchema);
