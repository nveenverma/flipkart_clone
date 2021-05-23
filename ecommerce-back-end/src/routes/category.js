const express = require("express");
const router = express.Router();

const multer = require("multer");
const shortid = require("shortid")
const path = require("path")

const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { addCategory, getCategories } = require("../controller/category")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
})

const upload = multer({ storage });

router.post('/category/create/', requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/get/', getCategories);

module.exports = router;