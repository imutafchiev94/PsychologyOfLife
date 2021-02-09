const {Router} = require('express');

const homeController = require('./controllers/homeController');
const blogController = require('./controllers/blogController');
const authController = require('./controllers/authController');

const router = Router();


router.use('/', homeController);
router.use('/blog', blogController);
router.use('/user', authController);
module.exports = router;
