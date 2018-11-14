const mongoose = require('mongoose');

// connect
module.exports = () => {
    mongoose.connect(config.mongodb, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', function(err) {
        console.log(err);
    });
    db.once('open', function() {
    // loadSample();
    // testDb();
    });
};

// Test
const loadSample = () => {
    const User = require('./models/user.js');
    const Thread = require('./models/thread.js');
    const Post = require('./models/post.js');
    const Comment = require('./models/comment.js');
  
    User.create({
      name: {
        firstname: 'Test1',
        lastname: 'test1'
      },
      email: 'Test1@test.com',
      password: 'pswtest1',
      gender: 'm'
    }, function(err, user) {
      console.log(err);
      console.log(user);
      Thread.create({
        name: 'TestT',
        description: 'Description of Test',
        count: 1,
        moderators: [user._id]
      }, function(err, thread) {
        console.log(err);
        console.log(thread);
        Post.create({
          user: user._id,
          thread: thread.name,
          title: 'Testpost1',
          body: 'Testbody..'
        }, function(err, post) {
          console.log(err);
          console.log(post);
          Comment.create({
            user: user._id,
            post: post._id,
            text: 'TestCom1'
          }, function(err, comment) {
            console.log(err);
            console.log(comment);
          });
        });
        Post.create({
          user: user._id,
          thread: thread.name,
          title: 'Testpost2',
          body: 'Testbody..'
        }, function(err, post) {
          console.log(err);
          console.log(post);
          Comment.create({
            user: user._id,
            post: post._id,
            text: 'TestCom1'
          }, function(err, comment) {
            console.log(err);
            console.log(comment);
          });
        });
      });
    });
  };
  
const testDb = () => {
    const User = require('./models/user.js');
    const Thread = require('./models/thread.js');
    const Post = require('./models/post.js');
    const Comment = require('./models/comment.js');

    User.list(function(err, users) {
        if (err) console.log(err);
        console.log(users.toString());
    });
    User.findOneAndUpdate({ email: 'Test4@test.com' }, { email: 'Test5@test.com' }, { new: true }, function(err, user) {
        if (err) console.log(err);
        console.log(user);
    });

    Thread.list(function(err, threads) {
        if (err) console.log(err);
        console.log(threads.toString());
    });

    Post.findByThread('TestT', function(err, posts) {
        if (err) console.log(err);
        console.log(posts.toString);
    });

    Comment.list(function(err, comments) {
        if (err) console.log(err);
        console.log(comments.toString());
    });
    Comment.findByIdAndUpdate('5beaf1a02890c841e1753ce7', { text: 'TestComment2' }, { new: true }, function(err, comment) {
        if (err) console.log(err);
        console.log(comment.toString());
    });
};