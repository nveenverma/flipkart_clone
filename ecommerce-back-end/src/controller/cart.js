const Cart = require("../models/cart")

const runUpdate = (condition, updateData) => {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate( condition, updateData, { upsert : true })
            .then(result => resolve())
            .catch(err => reject(err))
    })
}

exports.addItemToCart = (req, res) => {
    // Check If cart for current user already exists
    Cart.findOne({ user : req.user._id })
    .exec((error, cart) => {    
        if (error) return res.status(400).json({ error });        
        // If cart exists
        if (cart) {

            let promiseArray = [];

            // Update cart quantity for each product
            req.body.cartItems.forEach((reqBodycartItem) => {
                // check If the current item exists exists in cart, 
                const reqBodyproduct = reqBodycartItem.product;
                const item = cart.cartItems.find(dbCartItem => dbCartItem.product == reqBodyproduct);
                let condition, update;
    
                if (item) {
                    // If item exists, increase the quantity
                    condition = { "user" : req.user._id, "cartItems.product" : reqBodyproduct };
                    update = {
                        "$set" : {
                            "cartItems.$" : reqBodycartItem
                        }
                    };
                } else {
                    // If item does not exists, push to the current cart
                    condition = { "user" : req.user._id };
                    update = {
                        "$push" : {
                            "cartItems" : reqBodycartItem
                        }
                    };
                }
                promiseArray.push(runUpdate(condition, update));
            });

            Promise.all(promiseArray)
            .then(response => res.status(201).json({ response }))
            .catch(error =>  res.status(400).json({ error }))

        // If no cart, add items to a new cart
        } else {
            const cart = new Cart({
                user : req.user._id,
                cartItems : req.body.cartItems
            });
            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error })
                if (cart) return res.status(201).json({ cart })
            })
        }
    })
}

exports.getCartItems = (req, res) => {
    Cart.findOne({ user : req.user._id })
    .populate('cartItems.product', '_id name price productPictures')
    .exec((error, cart) => {
        if (error) return res.status(400).json({ error })
        if (cart) {
            let cartItems = {}
            cart.cartItems.forEach((dbCartItem, index) => {
                cartItems[dbCartItem.product._id.toString()] = {
                    _id : dbCartItem.product._id, 
                    name : dbCartItem.product.name, 
                    img : dbCartItem.product.productPictures[0].img, 
                    price : dbCartItem.product.price, 
                    qty : dbCartItem.qty
                }
            })
            res.status(200).json({ cartItems })
        }
    })
}