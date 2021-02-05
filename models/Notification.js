const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date,
    createdBy: Date,
    reciever: {type: mongoose.Types.ObjectId, ref: 'User'},
    isDeleted: Boolean,
});

module.exports = mongoose.model('Notification', notificationSchema);