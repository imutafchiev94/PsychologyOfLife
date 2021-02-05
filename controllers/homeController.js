const {Router} = require('express');
const nodemailer = require('nodemailer');

const mailConfig = require('../config/mailConfig');
const cloudinary = require('../config/cloudinaryConfig');

const router = Router();

router.get('/', async (req, res) => {

    let info = await mailConfig.sendMail({
        from: 'Fred Foo <admin@psychologyoflife.live>', // sender address
        to: 'Test "i.tomowa96@gmail.com"', // list of receivers
        subject: "Личен Имейл на Психология на живота ✔", // Subject line
        text: "Любов моя вече имаш личен имейл на психология на живота който е е admin@psychologyoflife.live и този имейл ти го пращам от сайта на психология на живота", // plain text body
      });

    res.render('index', {title: 'Начална Страница'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'За Мен'});
});

router.get('/contacts', (req, res) => {
    res.render('contacts', {title: 'Контакти'});
});

module.exports = router;