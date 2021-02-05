const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    email: {
        type: String,
         validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        },
    firstName: String,
    lastName: String,
    age: Number,
    
})