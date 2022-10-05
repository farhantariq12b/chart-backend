const express = require('express');
const OrderController = require('../app/order/OrderController');
const router = express.Router();

router.get('/v1/all-orders', OrderController.getAllOrders);
router.get('/v1/week-due-orders', OrderController.getWeekDueOrders);

module.exports = router;