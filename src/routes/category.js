const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory } = require('../controllers/category');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req,file,cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload =  multer({storage})

router.post('/category/create',requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory)
router.get('/category/getcategory', getCategory)

module.exports = router;