const cloudninary = require('cloudinary').v2;
const Article = require('../models/Article');
const cloudinaryConfig = require('../config/cloudinaryConfig');

cloudninary.config(cloudinaryConfig)


async function getAll() {
    let articles = await Article.find({}).lean();
    

    
    return articles; 
}

async function getAllFromCategory(categoryId) {
    let articles = await Article.find({category: categoryId}).lean();

    console.log(articles);

    return articles;
}

async function create(data, imageUrl, user) {
    let articleModel = {
        title: data.title,
        content: data.content,
        createdAt: Date.now(),
        createdBy: user.name,
        updatedAt: Date.now(),
        updatedBy: user.name,
        category: data.category,
        isDeleted: false,
    };

    await await cloudninary.uploader.upload(imageUrl, {resource_type: "image"})
    .then(function(file) {
        articleModel.imageUrl = file.url;
    }).catch(function(err) {
        console.log(err);
    });

    let article = await new Article(articleModel).lean();

    return await article.save();
}

module.exports = {
    getAll,
    getAllFromCategory,
    create
}