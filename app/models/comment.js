const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

CommentSchema.methods = {
};

CommentSchema.statics = {
    list: function(cb) {
        return this.find({}).populate('user').exec(cb);
    }
};

module.exports = mongoose.model('Comment', CommentSchema);