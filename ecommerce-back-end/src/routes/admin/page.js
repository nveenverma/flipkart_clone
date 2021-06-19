const express = require("express")
const router = express.Router()

const { upload, requireSignIn, adminMiddleware  } = require("../../common-middleware");
const { createPage, getPage } = require("../../controller/admin/page");

router.post('/page/create', upload.fields([
    { name : 'banners' },
    { name : 'products' }
]), requireSignIn, adminMiddleware, createPage)

// router.get('/page/:category/:type', getPage)
router.get(`/page/:category/:type`, getPage);

module.exports = router;