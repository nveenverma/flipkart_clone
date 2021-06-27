const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

// User Signup Logic
exports.signup = (req, res) => {

    User.findOne({ email : req.body.email })
    .exec(  async( error, user ) => {
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

        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username : shortid.generate()
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
    .exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === 'user') {
                
                // Generating JSON Web Token from the id returned
                const token = jwt.sign({ _id : user._id, role : user.role }, process.env.JWT_TOKEN, { expiresIn : '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                
                // Return JSON Web Token along with the user profile
                return res.status(200).json({
                    token,
                    user : { _id, firstName, lastName, email, role, fullName }
                })
            } else {
                return res.status(400).json({
                    message : 'Something went wrong'
                })
            }
        } else {
            return res.status(400).json({ message : 'Could not find this user' });
        }
    })
}