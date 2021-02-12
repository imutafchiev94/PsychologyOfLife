const {Router} = require('express');
const multipart = require('connect-multiparty');
const categoryService = require('../services/categoryService');
const blogService = require('../services/blogService');
const categoryController = require('../controllers/categoryController');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated')

const multipartMiddleware = multipart();

//Make cron jobs with node-schedule for mor information

const router = Router();

router.get('/', async (req, res) => {
    let articles = await blogService.getAll();
    let categories = await categoryService.getAll();


    res.render('blog/allArticles', {title: 'Всички Статии', categories, articles,})
})

router.get('/create', isAdmin ,async (req, res) => {
    let categories = await categoryService.getAll();

    res.render('blog/createArticle', {title: "Създаване На Статия", categories});
})

router.post('/create', isAdmin, multipartMiddleware , async (req, res) => {

    let filePath = req.files.imageUrl.path;

    try {
        let article = await blogService.create(req.body, filePath, req.user)
        res.redirect('/blog/')
    } catch(message) {
        res.render('blog/createArticle',  {title: "Създаване На Статия", categories, message})
    }
})


router.use('/category', categoryController);

module.exports = router;