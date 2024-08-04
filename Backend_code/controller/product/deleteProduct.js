const productModel = require('../../models/productModel'); // Adjust the path according to your project structure


async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error deleting product' });
    }
}

module.exports =  deleteProduct ; // Export along with other functions