const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');


const User = require('../models/user');
const Note = require('../models/note');
const Token = require('../models/token');

module.exports = {};

module.exports.getUserIdByToken = async (token) => {
    try{
        const user = await Token.findOne( { token: token} );
        return user.userId
    } catch (e) {
        throw e;
    }
}

module.exports.create = async (userId, text) => {
    try{
        const newNote = await User.create({
            text: text,
            userId: userId
        });
        return newNote;
    } catch (e) {
        throw e;
    }
}

module.exports.getAllNotesForUser = async (userId) => {
    try{
        const userNotes = Note.find( {userId: userId} ).lean();
        return userNotes
    } catch (e) {
        throw e;
    }
}

module.exports.getNoteById = async (noteId) => {
    try{
        const userNote = Note.findOne( {_id: noteId}).lean();
        return userNote
    } catch (e) {
        throw e;
    }
}