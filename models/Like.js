const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    article: {type: mongoose.Types.ObjectId, ref: 'Article'},
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    isDeleted: Boolean,
    vote: {type: Number, min: -1, max: 1}
});

module.exports = mongoose.model('Like', likeSchema);