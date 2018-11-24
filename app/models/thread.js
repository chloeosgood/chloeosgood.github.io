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
    list: function(pageNum, cb) {
        return this.find({})
        .skip(0)
        .limit(6)
        .populate('recentPost')
        .populate('recentUser')
        .sort({ recentPost: -1 })
        .exec(cb);
    }
};

module.exports = mongoose.model('Thread', ThreadSchema);