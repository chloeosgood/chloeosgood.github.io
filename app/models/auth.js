const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String
    }
});

AuthSchema.methods = {};

AuthSchema.statics = {};

module.exports = mongoose.model('Auth', AuthSchema);
