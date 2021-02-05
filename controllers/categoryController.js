const {Router} = require('express');
const cloudinary = require('cloudinary').v2;





const cloudinaryConfig = require('../config/cloudinaryConfig')

cloudinary.config(cloudinaryConfig);

const router = Router();

router.get('/create', (req, res) => {
    res.render('createCategory', {title: 'Create Category'});
})

router.post('/create', (req, res) => {

    console.log(req.body);
    console.log(req.files.imageUrl);
    
})

module.exports = router;