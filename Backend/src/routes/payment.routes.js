const express = require('express');
const controller = require('../controller/payment.controller')

const router = express.Router();

router.post('/create-order', controller.createOrder);
router.post('/verify', controller.verifyPayment);

module.exports = router