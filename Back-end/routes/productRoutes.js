const express = require('express');

const { getAllproducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require('../controllers/productController');
const router = express.Router();

router.route("/products").get(getAllproducts);
router.route("/product").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router