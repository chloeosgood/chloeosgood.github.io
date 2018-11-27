const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    thread: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
      // minlength: 50,
      // maxlength: 100
    },
    body: {
      type: String,
      required: true
      // minlength: 200
    },
    // img: {
    //   type: String,
    //   default: ''
    // },
    // video: {
    //   type: String,
    //   default: ''
    // },
    upvote: {
      type: Number,
      default: 0
    },
    downvote: {
      type: Number,
      default: 0
    },
    // count: {
    //   type: Number,
    //   default: 0
    // },
    createdAt: {
      type: Date,
      default: Date.now
    }
    // hide: {
    //   type: Boolean,
    //   default: false
    // }
});

PostSchema.path('title').validate((title) => {
  return title.length;
}, 'Title cannot be empty!');
PostSchema.path('body').validate((body) => {
  return body.length;
}, 'Body cannot be empty!');

PostSchema.methods = {
};

PostSchema.statics = {
  findByThread: function(thread, cb) {
    return this.find({ thread: thread }).sort({ createdAt: -1 }).populate('user').exec(cb);
  },

  recentPosts: function(cb) {
    return this.find({}).limit(10).sort({ _id: -1 }).populate('user').exec(cb);
  }
};

module.exports = mongoose.model('Post', PostSchema);