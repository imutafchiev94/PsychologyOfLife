const {Router} = require('express');

const categoryService = require('../services/categoryService');

const router = Router();

router.get('/', async (req, res) => {
    let categories = await categoryService.getAll();
    
    res.render('home/index', {title: 'Начална Страница', categories});
});

router.get('/about', async (req, res) => {
    let categories = await categoryService.getAll();

    res.render('home/about', {title: 'За Мен', categories});
});

router.get('/contacts', async (req, res) => {
    let categories = await categoryService.getAll();

    res.render('home/contacts', {title: 'Контакти', categories});
});

module.exports = router;