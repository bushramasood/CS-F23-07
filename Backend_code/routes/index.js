const express = require('express');
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

const changePasswordController = require('../controller/user/changePasswordController');
router.post('/change-password', changePasswordController); // Removed authToken here

const { addReview, getProductReviews } = require('../controller/product/reviewController');
const { clearCart } = require('../controller/product/cartController'); 
const deleteOrder = require('../controller/order/deleteOrder'); 
const updateOrder = require('../controller/order/updateOrder');

// Review routes
router.post('/add-review', authToken, addReview);
router.get('/get-Reviews/:productId', getProductReviews);
router.delete('/delete-order/:orderId', authToken, deleteOrder);
router.post('/update-order', authToken, updateOrder);
router.post('/clearCart', authToken, clearCart);

const userProfile = require('../controller/user/profile');
router.get('/profile', authToken, userProfile);

const updateProfile = require('../controller/user/updateProfile');
router.post('/update-profile', authToken, updateProfile);

const deleteUser = require('../controller/user/deleteUser');
const deleteProduct = require('../controller/product/deleteProduct');

const { createOrder } = require('../controller/order/orderController');
router.post('/create-order', authToken, createOrder);

const allOrders = require('../controller/order/allOrders');
router.get('/all-orders', authToken, allOrders);

const { vendorUploadProduct, vendorGetProducts, vendorUpdateProduct, vendorDeleteProduct } = require('../controller/product/vendorProductController');

router.post('/vendor-upload-product', authToken, vendorUploadProduct);
router.get('/vendor-products', authToken, vendorGetProducts);
router.post('/vendor-update-product', authToken, vendorUpdateProduct);
router.delete('/vendor-delete-product/:productId', authToken, vendorDeleteProduct);

const  getUserOrders  = require('../controller/order/getUserOrders');
router.get('/user-orders', authToken, getUserOrders);

const getUserCount = require('../controller/user/getUserCount');
const getProductCount = require('../controller/product/getProductCount');
const getOutOfStockProductCount = require('../controller/product/getOutOfStockProductCount');

router.get('/dashboard/users/count', authToken, getUserCount);
router.get('/dashboard/products/count', authToken, getProductCount);
router.get('/dashboard/products/out-of-stock/count', authToken, getOutOfStockProductCount);

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.delete('/delete-user/:id', deleteUser);

// product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

router.delete('/delete-product/:id', deleteProduct);

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

module.exports = router;
