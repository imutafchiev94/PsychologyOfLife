const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    articles: [{
        type: mongoose.Types.ObjectId, ref: 'Article'
    }],
    isDeleted: Boolean,
    
})

module.exports = mongoose.model('Category', categorySchema);