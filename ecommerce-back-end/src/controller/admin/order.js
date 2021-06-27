const Order = require("../../models/order")

exports.updateOrder = (req, res) => {
    Order.UpdateOne(
        { 
            user : req.user._id,
            "orderStatus.type" : req.body.type
        },
        {
            $set : { "orderStatus.$" : [{ date : new Date(), type: req.body.type, isCompleted : true }] }
        }
    )
    .exec((error, order) => {
        if (error) return res.status(400).json({ error })
        if (orders) res.status(201).json({ order })        
    })
}