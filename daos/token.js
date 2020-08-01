const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const Note = require('../models/note');
const Token = require('../models/token');

module.exports = {};

module.exports.getTokenForUserId = async (userId) => {
    try {
        const user = Token.findOne( {userId: userId} )
        return user.token;
    } catch (e) {
        throw e;
    }
}

module.exports.getUserIdFromToken = async (tokenString) => {
    try{
        const token = Token.findOne( { token: tokenString })
        return token.userId
    } catch (e) {
        throw e;
    }
}

module.exports.removeToken = async (tokenString) => {
    try {
        await Token.deleteOne({ token: tokenString }); 
        return true;
    } catch (e) {
        throw e;
    }
}