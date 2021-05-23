const jwt = require('jsonwebtoken')

exports.requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = user;
    } else {
        return res.status(400).json({ message : "Authorization Required" })
    }
    next();
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role != "user") {
        res.status(400).json({ message : "Access Denied" })
    }
    next();    
}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role != "admin") {
        res.status(400).json({ message : "Access Denied" })
    }
    next();
}