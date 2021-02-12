const {Router} = require('express');
const multipart = require('connect-multiparty');
const blogService = require('../services/blogService');
const categoryService = require('../services/categoryService');

const multipartMiddleware = multipart();

const router = Router();

router.get('/create', async (req, res) => {
    let categories = await categoryService.getAll();

    res.render('blog/createCategory', {title: 'Create Category', categories});
})

router.post('/create', multipartMiddleware, (req, res) => {

    let filename = req.files.imageUrl.path;

    categoryService.create(req.body, filename).
    then(res.redirect('/'))
    .catch(res.status(500).end());
})

router.get('/:categoryId', async (req, res) => {
    try {
        let categories = await categoryService.getAll();
        let articles = await blogService.getAllFromCategory(req.params.categoryId);
        let category = await categoryService.getOne(req.params.categoryId);
        

        
        res.render('blog/categoryArticles', {title: `${category.title}`, categories, articles});
    } catch (message) {
        res.redirect('/');
    }
})

module.exports = router;