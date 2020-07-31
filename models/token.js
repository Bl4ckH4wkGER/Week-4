const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    email: { type: String, required: true, index: true, unique: true },
    token: { type: String, required: true },
});

module.exports = mongoose.model("token", tokenSchema);