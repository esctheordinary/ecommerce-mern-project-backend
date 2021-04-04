const express = require('express');
const { signup, signin } = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signin', signin);

router.post('/admin/signup',validateRequest, isRequestValidated, signup);

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({message:"User profile"})
// })

module.exports = router;