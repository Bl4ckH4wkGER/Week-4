const mongoose = require('mongoose');

const User = require('../models/user');
const Note = require('../models/note');
const Token = require('../models/token');

module.exports = {};

module.exports.createNote = async (userId, text) => {
    try{
        const newNote = await Note.create({
            text: text,
            userId: userId
        });
        return newNote;
    } catch (e) {
        throw e;
    }
}

module.exports.getNote = async (userId, noteId) => {
    try{
        const userNote = Note.find( {userId: userId}, {_id: noteId});
        return userNote
    } catch (e) {
        throw e;
    }
}

module.exports.getUserNotes = async(userId) => {
    try{
        const notes = Note.find( { userId: userId });
        return notes
    } catch (e) {
        throw e;
    }

}
