const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    stock: Number // Add stock field here
},{
    timestamps: true
})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel