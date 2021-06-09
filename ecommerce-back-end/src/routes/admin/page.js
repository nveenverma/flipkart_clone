const express = require("express")
const router = express.Router()

const { upload, requireSignIn, adminMiddleware  } = require("../../common-middleware");
const { createPage } = require("../../controller/admin/page");

router.post('/page/create', upload.fields([
    { name : 'banners' },
    { name : 'products' }
]), requireSignIn, adminMiddleware, createPage)

module.exports = router;