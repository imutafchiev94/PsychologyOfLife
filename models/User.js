const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: false},
    passwordHash: {type: String, required: false},
    email: {
        type: String,
         validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        },
    isEmailConfirmed: Boolean,
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    createdAt: Date,
    updatedAt: Date,
    isDeleted: Boolean,
    facebookId: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);