const express = require('express');
const router = express.Router();
const{ newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/OrderController');
const { isAuthenticateUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser,  getSingleOrder);
router.route('/orders/me').get(isAuthenticateUser, myOrders);
router.route('/admin/orders').get(isAuthenticateUser, authorizeRoles("admin"), getAllOrders);//admin can see all
router.route('/admin/order/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;