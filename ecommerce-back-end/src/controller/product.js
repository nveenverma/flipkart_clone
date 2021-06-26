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
    
    const {slug} = req.params;
    Category.findOne({ slug : slug })
    .select('_id type')
    .exec( (error, category) => {
        
        if (error) {
            return res.status(400).json({ error })
        }

        if (category) {
            Product.find({ category : category._id })
            .exec( (error, products) => {

                if (error) {
                    return res.status(400).json({ error })
                }

                if (category.type) {
                    if (products.length > 0) {
                        res.status(200).json({ 
                            products,
                            productsByPrice : {
                                under5K : products.filter(product => product.price <= 5000),
                                under10K : products.filter(product => product.price > 5000 && product.price <= 10000),
                                under15K : products.filter(product => product.price > 10000 && product.price <= 15000),
                                under20K : products.filter(product => product.price > 15000 && product.price <= 20000),
                                under30K : products.filter(product => product.price > 20000 && product.price <= 30000),
                                above30K : products.filter(product => product.price > 30000)
                            }
                        })
                    }
                } else {
                    res.status(200).json({ products })
                }
            })
        }
    })
}

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