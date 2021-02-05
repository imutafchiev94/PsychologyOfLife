const {Router} = require('express');

const router = Router();

const categoryController = require('../controllers/categoryController');

router.use('/category', categoryController);

module.exports = router;