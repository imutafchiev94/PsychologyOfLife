const mongoose = require('mongoose');

const articleScema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String,
    imageUrl: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    category: {
        type: mongoose.Types.ObjectId,
         ref: 'Category'
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Like'
    }],
    coments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    views: [{
        type: mongoose.Types.ObjectId,
        ref: 'View'
    }],
    totalVote: Number,
    isDeleted: Boolean,
});

module.exports = mongoose.model('Article', articleScema);