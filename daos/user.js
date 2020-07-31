const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const Note = require('../models/note');
const Token = require('../models/token');

module.exports = {};

module.exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user
    } catch (e) {
        throw e;
    }
}

module.exports.getStoredPassword = async (email) => {
    try {
        const storedPassword = await User.findOne({ email: email }, { password: 1 });
        return storedPassword
    } catch (e) {
        throw e;
    }
}

module.exports.getUserToken = async (email) => {
    try{
        const tokenString = uuidv4();
        const userToken = Token.create({
            email: email,
            token: tokenString
        });
        return userToken;
    } catch (e) {
        throw e;
    }
}

// module.exports.loginUser = async (email, password) => {
//     if(!password) {
//         res.status(400).send('Must provide a password.');
//     } else {
//         return {}
//         const storedPasswordHash = await User.findOne({ email: email }, { _id: 0, email: 0, password: 1});
//         try{
//             const passwordHashMatch = bcrypt.compare(password, storedPasswordHash);
//             if (passwordHashMatch == true) {
//                 const newToken = uuidv4();
//                 const userToken = Token.create({
//                     email: email,
//                     token: newToken
//                 })
//                 return userToken;
//             } else {
//                 res.status(401).send('Wrong password.');
//             }
//         } catch (e) {
//             throw e;
//         }
//     }
//     const storedPasswordHash = await User.findOne({ email: email }, { _id: 0, email: 0, password: 1});
//     try{
//         const passwordHashMatch = bcrypt.compare(password, storedPasswordHash);
//         if (passwordHashMatch == true) {
//             const userToken = uuidv4();
//             const validUser = User.aggregate([
//                 { $match: { email: email }},
//                 { $set: { token: userToken } }
//             ]);
//             return validUser;
//         }
//     } catch (e) {
//         throw e;
//     }
// };

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

// module.exports.logout = async (userData) => {}

// module.exports.changePassword = async (userData, newPassword) => {}
