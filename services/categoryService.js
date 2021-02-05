const mongoose = require('mongoose');

const Category = require('../models/Category');

async function getAll() {
    let categories = await Category.filter(x => x.isDeleted == false).lean();
    
    return categories;
}

async function create(data) {
    
}

module.exports = {
    getAll,
}