const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: Number,
    title: String,
    description: String,
    imageUrl: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    articles: [{
        type: mongoose.Types.ObjectId, ref: 'Article'
    }]
})

module.exports = mongoose.model('Category', categorySchema);