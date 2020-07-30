const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const User = require('../models/user');
const Note = require('../models/note');

module.exports = {};

// module.exports.login = async (userData) => {}

module.exports.signup = async (userData) => {
    try {
        const newUser = await User.create(userData);
        // const passwordHash = await bcrypt.hash(userData.password, 10);
        // const newUserAdjusted = await User.aggregate([
        //     { $match: { username: userData.username } },
        //     { $update: { password: passwordHash }}
        // ]);
        return newUser;
    } catch (e) {
        throw e;
        // if (e.message.includes('validation failed') || e.message.includes('duplicate key error')) {
        //     throw new BadDataError(e.message);
        // } else {
        //     throw e;
        // }
    }

}

// module.exports.logout = async (userData) => {}

// module.exports.changePassword = async (userData, newPassword) => {}

// class BadDataError extends Error {};
// module.exports.BadDataError = BadDataError;