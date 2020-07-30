const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // may have to remove unique: true again from token?
    token: { type: String }
});

userSchema.index({ username: 1 });

module.exports = mongoose.model("users", userSchema);