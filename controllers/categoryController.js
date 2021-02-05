const {Router} = require('express');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();



const categoryService = require('../services/categoryService');


const router = Router();

router.get('/create', (req, res) => {
    res.render('createCategory', {title: 'Create Category'});
})

router.post('/create', multipartMiddleware, (req, res) => {

    let filename = req.files.imageUrl.path;

    categoryService.create(req.body, filename).
    then(res.redirect('/'))
    .catch(res.status(500).end());
})

module.exports = router;