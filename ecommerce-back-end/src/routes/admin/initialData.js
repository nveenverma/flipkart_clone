const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();

router.get('/initialData', initialData);

module.exports = router;