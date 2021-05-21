const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const router = express.Router();

const { addCategory, getCategories } = require("../controller/category")

router.post('/category/create/', requireSignIn, adminMiddleware, addCategory);
router.get('/category/get/', getCategories);

module.exports = router;