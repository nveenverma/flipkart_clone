const Product = require("../models/product.js");
const slugify = require("slugify")
const Category = require("../models/category");

exports.createProducts = (req, res) => {
    // res.status(200).json({ file : req.files, body : req.body });

    const { name, price, description, category, quantity } = req.body;

    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return ({ img : file.filename })
        })
    }

    const product = new Product({
        name,
        slug : slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy : req.user._id
    });

    product.save((error, product) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (product) {
            return res.status(201).json({ product })
        }
    })
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
      .select("_id type")
      .exec((error, category) => {
        if (error) {
          return res.status(400).json({ error });
        }
  
        if (category) {
          Product.find({ category: category._id }).exec((error, products) => {
            if (error) {
              return res.status(400).json({ error });
            }
  
            if (category.type) {
              if (products.length > 0) {
                res.status(200).json({
                  products,
                  priceRange: {
                    under10k: '10,000',
                    under20k: '20,000',
                    under30k: '30,000',
                    under50k: '50,000',
                    under100k: '1,00,000',
                  },
                  productsByPrice: {
                    under10k: products.filter((product) => product.price <= 10000),
                    under20k: products.filter(
                      (product) => product.price > 10000 && product.price <= 20000
                    ),
                    under30k: products.filter(
                      (product) => product.price > 20000 && product.price <= 30000
                    ),
                    under50k: products.filter(
                      (product) => product.price > 30000 && product.price <= 50000
                    ),
                    under100k: products.filter(
                      (product) => product.price > 50000 && product.price <= 100000
                    ),
                  },
                });
              }
            } else {
              res.status(200).json({ products });
            }
          });
        }
      });
  };

exports.getDetailsById = (req, res) => {
    const { productId } = req.params;

    if (productId) {
        Product.findOne({ _id : productId })
        .exec((error, product) => {
            if (error) return res.status(400).json({ error })
            if (product) res.status(200).json({ product })            
        })
    } else {
        return res.status(400).json({ error : 'Params required' })
    }
}