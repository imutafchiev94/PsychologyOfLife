const {Router} = require('express');
const categoryService = require('../services/categoryService');

const router = Router();

router.get('/', (req, res) => {

    res.render('index', {title: 'Начална Страница'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'За Мен'});
});

router.get('/contacts', (req, res) => {
    res.render('contacts', {title: 'Контакти'});
});

module.exports = router;