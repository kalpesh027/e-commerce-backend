const express = require('express');

const { getAllproducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require('../controllers/productController');
const { isAuthenticateUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/products")
.get(getAllproducts);

router.route("/admin/product/new")
.post(isAuthenticateUser,authorizeRoles("admin"),createProduct);

router.route("/admin/product/:id")
.put(isAuthenticateUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticateUser, deleteReview);



module.exports = router