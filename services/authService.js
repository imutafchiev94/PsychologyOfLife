const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const UserRole = require('../models/UserRole');

const register = async (data) => {
   
    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    let hash = await bcrypt.hash(data.password, salt);
    
    let role = await UserRole.findOne({name: 'user'});

    console.log(role);

    let user = await User.findOne({$or: [{username: data.username}, {email: data.email}]}).exec();

    if(!user) {
        let userData = {
            username: data.username,
            passwordHash: hash,
            email: data.email,
            createdAt: Date.now(),
            createdBy: data.username,
            updatedAt: Date.now(),
            updatedBy: data.username,
            isDeleted: false,
            isEmailConfirmed: true,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            role: role,
        };

        user = await new User(userData);
        return await user.save();

    } else {
        return {message: "User alredy exist"};
    }
}

async function login({username, password}) {
    let user = await User.findOne({username}).populate('role').lean();

    let role = await UserRole.findOne({name: 'admin'});

    if(!user) {
        return {message: "Wrong Credentials"}
    }

    let isMatch = await bcrypt.compare(password, user.passwordHash);

    if(!isMatch) {
        return {message: "Wrong Credentials"}
    }


    let token = jwt.sign({_id: user._id, role: user.role._id }, process.env.USER_SESION_SECRET);

    return token;
}

module.exports = {
    register,
    login,
};
