const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    recentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null,
    },
    recentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    // description: {
        // type: String
        // required: true
        // minlength: 100,
        // maxlength: 300
    // },
    count: {
        type: Number,
        default: 0
    }
    // moderators: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'User'
    // }
});

ThreadSchema.methods = {
};

ThreadSchema.statics = {
    list: function(options, cb) {
        return this.find({}, null, options)
        .populate('recentPost')
        .populate('recentUser')
        .exec(cb);
    },

    listByRecentPost: function(cb) {
        return this.list({ sort: '-recentPost'}, cb);
    },

    listByName: function(cb) {
        return this.list({ sort: 'name' }, cb);
    }
};

module.exports = mongoose.model('Thread', ThreadSchema);