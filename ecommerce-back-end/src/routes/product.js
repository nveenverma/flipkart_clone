const express = require("express");
const router = express.Router();

const multer = require("multer");
const shortid = require("shortid")
const path = require("path")

const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { createProducts } = require("../controller/product")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
})

const upload = multer({ storage });

router.post('/product/create/', requireSignIn, adminMiddleware, upload.array('productPicture'), createProducts);
// router.get('/category/get/', getCategories);

module.exports = router;