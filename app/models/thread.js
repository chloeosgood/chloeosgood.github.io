const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    recent_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    recent_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // description: {
        // type: String
        // required: true
        // minlength: 100,
        // maxlength: 300
    // },
    // count: {
    //     type: Number,
    //     default: 0
    // },
    // moderators: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'User'
    // }
});

ThreadSchema.methods = {
};

ThreadSchema.statics = {
    list: function(cb) {
        return this.find({}, cb);
    }
};

module.exports = mongoose.model('Thread', ThreadSchema);