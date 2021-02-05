const {Router} = require('express');

const router = Router();

const homeController = require('./controllers/homeController');

const blogController = require('./controllers/blogController');

router.use('/', homeController);
router.use('/blog', blogController);

module.exports = router;
