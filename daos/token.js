const mongoose = require('mongoose');

const Token = require('../models/token');

module.exports = {};

module.exports.getTokenForUserId = async (userId) => {
    try {
        const user = await Token.findOne( {userId: userId} )
        return user.token;
    } catch (e) {
        throw e;
    }
}

module.exports.getUserIdFromToken = async (tokenString) => {
    const token = await Token.findOne({ token: tokenString});
    if(token){
        return token.userId;
    } else {
        return false;
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