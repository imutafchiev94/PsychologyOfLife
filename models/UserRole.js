const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('UserRole', userRoleSchema)