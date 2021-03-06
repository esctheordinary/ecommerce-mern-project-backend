const { check, validationResult } = require('express-validator')

exports.validateRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('Firstname is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Lastname is required'),
    check('lastName'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 character long'),
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}