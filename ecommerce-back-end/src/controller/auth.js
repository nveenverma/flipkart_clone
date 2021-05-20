const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

    User.findOne({ email : req.body.email })
    .exec(( error, user ) => {
        // If user doesn't exists
        if (user) {
            return res.status(400).json({
                message : 'User already registered'
            })
        }
    
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username : Math.random().toString()
        })
        
        _user.save((error, data) => {
            if (error) {
                res.status(400).json({
                    message : 'Something went wrong'
                })
            }
            
            if (data) {
                res.status(201).json({
                    message : 'User created successfully...!'
                })
            }
        });
    });
}

exports.signin = (req, res) => {
    User.findOne({ email : req.body.email })
    .exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            if (user.authenticate(req.body.password)) {
                
                // Generating JSON Web Token from the id returned
                const token = jwt.sign({ _id : user._id }, process.env.JWT_TOKEN, { expiresIn : '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                
                // Return JSON Web Token along with the user profile
                return res.status(200).json({
                    token,
                    user : { _id, firstName, lastName, email, role, fullName }
                })
            } else {
                return res.status(400).json({
                    message : "Invalid Password"
                })
            }
        } else {
            return res.status(400).json({ message : 'Something went wrong' });
        }
    })
}

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.JWT_TOKEN);
    req.user = user;
    next();
}