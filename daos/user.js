const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const Note = require('../models/note');
const Token = require('../models/token');

module.exports = {};

module.exports.signup = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            email: email,
            password: passwordHash
        });
        return newUser;
    } catch (e) {
        throw e;
    }
};

module.exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user
    } catch (e) {
        throw e;
    }
}

module.exports.updateUserPassword = async (userId, password) => {
    try {
        const newPasswordHash = await bcrypt.hash(password, 10);
        const updatedUser = User.update({ _id: userId }, {  password: newPasswordHash });
        return updatedUser;
    } catch (e) {
        throw e;
    }
}

module.exports.assignUserToken = async (userId) => {
    const tokenString = uuidv4();
    try{
        const userToken = Token.create({
            userId: userId,
            token: tokenString
        });
        return userToken;
    } catch (e) {
        throw e;
    }
}
