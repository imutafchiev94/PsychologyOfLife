const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    email: {
        type: String,
         validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        },
    isEmailConfirmed: Boolean,
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: Boolean,
});

module.exports = mongoose.model('User', userSchema);