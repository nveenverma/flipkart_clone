const Cart = require("../models/cart")

exports.addItemToCart = (req, res) => {

    // Check If cart for current user already exists
    Cart.findOne({ user : req.user._id }).exec((error, cart) => {
        
        if (error) return res.status(400).json({ error });        
        
        // If cart exists
        if (cart) {

            // check If the current item exists exists in cart, 
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, update;

            if (item) {
                // If item exists, increase the quantity
                condition = { "user" : req.user._id, "cartItems.product" : product };
                update = {
                    "$set" : {
                        "cartItems.$" : {
                            ...req.body.cartItems,
                            quantity : item.quantity + req.body.cartItems.quantity
                        }
                    }
                };

            } else {
                // If item does not exists, push to the current cart
                condition = { "user" : req.user._id };
                update = {
                    "$push" : {
                        "cartItems" : req.body.cartItems
                    }
                };

            }

            Cart.findOneAndUpdate( condition, update ).exec((error, _cart) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (_cart) {
                    return res.status(201).json({ cart : _cart })
                }
            })

        // If no cart, add items to a new cart
        } else {

            const cart = new Cart({
                user : req.user._id,
                cartItems : req.body.cartItems
            });
        
            cart.save((error, cart) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (cart) {
                    return res.status(201).json({ cart })
                }
            })
        }
    })
    
}