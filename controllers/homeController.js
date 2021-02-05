const {Router} = require('express');
const categoryService = require('../services/categoryService');

const cloudinary = require('../config/cloudinaryConfig');

const router = Router();

router.get('/', (req, res) => {

    console.log(categoryService.getAll());

    res.render('index', {title: 'Начална Страница'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'За Мен'});
});

router.get('/contacts', (req, res) => {
    res.render('contacts', {title: 'Контакти'});
});

module.exports = router;