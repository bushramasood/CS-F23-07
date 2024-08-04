const Review = require('../../models/reviewModel');
const Product = require('../../models/productModel');

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Please Login...!" });
        }

        const newReview = new Review({ productId, userId, rating, comment });
        await newReview.save();

        // Update product rating
        const reviews = await Review.find({ productId });
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        await Product.findByIdAndUpdate(productId, { avgRating, reviewCount: reviews.length });

        res.status(201).json({ success: true, message: 'Review added successfully', data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(`Fetching reviews for productId: ${productId}`);
        
        // Ensure productId is a valid ObjectId
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            console.error('Invalid productId format');
            return res.status(400).json({ success: false, message: 'Invalid productId format' });
        }

        // Fetch reviews and populate user details
        const reviews = await Review.find({ productId }).populate('userId', 'name');
        console.log('Query result:', reviews);

        if (!reviews.length) {
            console.log('No reviews found for this product');
            return res.status(404).json({ success: false, message: 'No reviews found for this product' });
        }

        console.log(`Found ${reviews.length} reviews`);
        res.status(200).json({ 
            message: "Product reviews fetched successfully",
            data: reviews,
            success: true,
            error: false 
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ 
            message: error.message || "An error occurred",
            success: false,
            error: true 
        });
    }
};

module.exports = { addReview, getProductReviews };