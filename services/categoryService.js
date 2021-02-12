
const cloudinary = require('cloudinary').v2;

const Category = require('../models/Category');
const cloudinaryConfig = require('../config/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);

async function getAll() {
    let categories = await Category.find({}).lean();
    
    return categories;
}

async function create(data, imageUrl) {
    
    let categoryModel = {
        title: data.title,
        description: data.description,
        createdAt: Date.now(),
        createdBy: 'admin',
        updatedAt: Date.now(),
        updatedBy: 'admin',
        imageUrl: ''
    };




    await cloudinary.uploader.upload(imageUrl, {resource_type: "image"}).
    then(function(file) {categoryModel.imageUrl = file.url}).
    catch(function(err) {console.log(err)});
    
    
    let category = new Category(categoryModel);

    return category.save();
}

async function getOne(categoryId) {
    let category = await Category.findById(categoryId).lean();

    return category;
}

module.exports = {
    getAll,
    create,
    getOne
}