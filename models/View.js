const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    article: {type: mongoose.Types.ObjectId, ref: 'Article'},
    createdAt: Date,
    createdBy: String,
    isDeleted: Boolean,
});

module.exports = mongoose.model('View', viewSchema);