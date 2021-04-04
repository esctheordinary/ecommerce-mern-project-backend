const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already exist'
            });
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName, lastName, email, password, username: Math.random().toString()
            })
            _user.save((error, data) => {
                if (error) {
                    return req.status(400).json({
                        message: 'Something went worng'
                    })
                }
                if (data) {
                    return res.status(201).json({
                        message: 'User created successfull...!'
                    })
                }
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id , role: user.role }, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullname } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullname
                        }
                    })
                } else {
                    return res.status(400).json({ message: 'Invalid password' })
                }
            } else {
                res.status(400).json({ message: 'User not found' })
            }
        })
}
