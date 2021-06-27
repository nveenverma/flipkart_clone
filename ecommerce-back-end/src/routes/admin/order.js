const express = require('express');
const router = express.Router();

const { requireSignIn, adminMiddleware } = require('../../common-middleware');
const { updateOrder } = require('../../controller/admin/order');

router.post('/order/update', requireSignIn, adminMiddleware, updateOrder);

module.exports = router;