const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: 'delete'
    },
    resetPassword: {
        url: `${backendDomin}/api/reset-password`,
        method: 'post'
    },
    deleteUser: {
        url: `${backendDomin}/api/delete-user`,
        method: 'delete'
    },
    createOrder: {
        url: `${backendDomin}/api/create-order`,
        method: 'post'
    },
    allOrders: {
        url: `${backendDomin}/api/all-orders`,
        method: 'get'
    },
    vendorUploadProduct: {
        url: `${backendDomin}/api/vendor-upload-product`,
        method: 'post'
    },
    vendorProduct: {
        url: `${backendDomin}/api/vendor-products`,
        method: 'get'
    },
    vendorUpdateProduct: {
        url: `${backendDomin}/api/vendor-update-product`,
        method: 'post'
    },
    vendorDeleteProduct: {
        url: `${backendDomin}/api/vendor-delete-product`,
        method: 'delete'
    },
    reviews: {
        url: `${backendDomin}/api/reviews`,
        method: 'GET'
    },
    addReview: {
        url: `${backendDomin}/api/add-review`,
        method: 'POST'
    },
    clearCart: {
         url: `${backendDomin}/api/clearCart`,
          method: 'POST' 
        },
    deleteOrder: {
        url: `${backendDomin}/api/delete-order`,
        method: 'DELETE'
    },
    updateOrder: {
        url: `${backendDomin}/api/update-order`,
        method: 'POST'
        },
    profile: {
        url: `${backendDomin}/api/profile`,
        method: 'get'
    },
    updateProfile: {
        url: `${backendDomin}/api/update-profile`,
        method: 'post'
    },
    changePassword:{
        url: `${backendDomin}/api/change-password`,
        method: 'post'
    },
    userOrders: {
        url: `${backendDomin}/api/user-orders`,
        method: 'get'
    },
// Dashboard endpoints
userCount: {
    url: `${backendDomin}/api/dashboard/users/count`,
    method: 'get'
},
productCount: {
    url: `${backendDomin}/api/dashboard/products/count`,
    method: 'get'
},
outOfStockProductCount: {
    url: `${backendDomin}/api/dashboard/products/out-of-stock/count`,
    method: 'get'
    },
getReviews: {
    url: `${backendDomin}/api/get-Reviews`,
    method: 'GET'
},
addReview: {
    url: `${backendDomin}/api/add-review`,
    method: 'POST'
    },
translateText: {
    url: `${backendDomin}/api/translate`,
    method: 'POST'
  }

}

export default SummaryApi;
