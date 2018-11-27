const mongoose = require('mongoose');

const config = require('../config/default.js');

// connect
module.exports = () => {
    mongoose.connect(config.uri, {
        useFindAndModify: false,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', function (err) {
        console.log('Connection Failed');
        if (err) console.log(err);
    });
    db.once('open', function () {
        console.log('DB Opened');
        //clear();
        //loadSample();
        // testDb();
    });
};

// Test
const clear = () => {
    const User = require('../models/user.js');
    const Thread = require('../models/thread.js');
    const Post = require('../models/post.js');
    const Comment = require('../models/comment.js');
    const Auth = require('../models/auth.js');

    Auth.deleteMany({}, function(err) { console.log });
    Comment.deleteMany({}, function(err) { console.log });
    User.deleteMany({}, function(err) { console.log });
    Thread.deleteMany({}, function(err) { console.log });
    Post.deleteMany({}, function(err) { console.log });
}

const loadSample = () => {
    const User = require('../models/user.js');
    const Thread = require('../models/thread.js');
    const Post = require('../models/post.js');
    const Comment = require('../models/comment.js');
    const Auth = require('../models/auth.js');

    const user1 = {
        name: {
            firstname: 'FIRST',
            lastname: 'LAST'
        },
        username: 'USER1',
        email: 'USER1@COM',
        password: 'PASSWORD'
    };

    const user2 = {
        name: {
            firstname: 'FIRST',
            lastname: 'LAST'
        },
        username: 'USER2',
        email: 'USER2@COM',
        password: 'PASSWORD'
    };

    const user3 = {
        name: {
            firstname: 'FIRST',
            lastname: 'LAST'
        },
        username: 'USER3',
        email: 'USER3@COM',
        password: 'PASSWORD'
    };

    const thread1 = 'Test Name 1';
    const thread2 = 'Test Name 2';
    const thread3 = 'Test Name 3';

    Thread.create({ name:  thread1 }, function(err, thread) {
        //console.log(err);
        //console.log(thread);
    });
    Thread.create({ name: thread2 }, function(err, thread) {
        //console.log(err);
        //console.log(thread);
    });
    Thread.create({ name: thread3 }, function(err, thread) {
        //console.log(err);
        //console.log(thread);
    });


    User.create(user1, function(err, user) {
        console.log(err);

        Post.create({ user: user._id, thread: thread2, title: 'Post Title 1', body: 'Post Body 1' },
        function(err, post) {
            Thread.findOneAndUpdate({ name: thread2 }, { recentPost: post._id, recentUser: user._id }, { new: true},
            function(err, thread) {
                //console.log(thread);
            });

            Comment.create({ user: user._id, post: post._id, text: 'Comment 1 for Post 1' }, function(err, comment) {
                //console.log(err);

                //console.log(comment);
            });
            Comment.create({ user: user._id, post: post._id, text: 'Comment 2 for Post 1' }, function(err, comment) {
                //console.log(err);

                //console.log(comment);
            });
        });
    });
    User.create(user2, function(err, user) {
        console.log(err);

        Post.create({ user: user._id, thread: thread1, title: 'Post Title 2', body: 'Post Body 2' },
        function(err, post) {
            Thread.findOneAndUpdate({ name: thread1 }, { recentPost: post._id, recentUser: user._id }, { new: true},
            function(err, thread) {
                //console.log(thread);
            });

            Comment.create({ user: user._id, post: post._id, text: 'Comment 1 for Post 2' }, function(err, comment) {
                //console.log(err);
    
                //console.log(comment);
            });
        });
    });
    User.create(user3, function(err, user) {
        console.log(err);

        Post.create({ user: user._id, thread: thread3, title: 'Post Title 3', body: 'Post Body 3' },
        function(err, post) {
            Thread.findOneAndUpdate({ name: thread3 }, { recentPost: post._id, recentUser: user._id }, { new: true},
            function(err, thread) {
                //console.log(thread);
            });

            Comment.create({ user: user._id, post: post._id, text: 'Comment 1 for Post 3' }, function(err, comment) {
                //console.log(err);
    
                //console.log(comment);
            });
        });
    });
};

const testDb = () => {
    const User = require('../models/user.js');
    const Thread = require('../models/thread.js');
    const Post = require('../models/post.js');
    const Comment = require('../models/comment.js');

    Post.recentPosts(function(err, posts) {
        console.log(err);
        
        console.log(posts);
    });
};

// Samples

// [ { recentPost:
//     { upvote: 0,
//       downvote: 0,
//       _id: 5bf265b99eeb44c4d450b062,
//       user: 5bf265b89eeb44c4d450b05c,
//       thread: 'Test Name 1',
//       title: 'Post Title 2',
//       body: 'Post Body 2',
//       createdAt: 2018-11-19T07:26:49.964Z,
//       __v: 0 },
//    recentUser:
//     { classification: 'Freshman',
//       major: 'Computer Science',
//       avatar: '',
//       authority: 0,
//       _id: 5bf265b89eeb44c4d450b05c,
//       name: [Object],
//       username: 'USER2',
//       email: 'USER2@COM',
//       password: 'PASSWORD',
//       __v: 0 },
//    _id: 5bf265b89eeb44c4d450b057,
//    name: 'Test Name 1',
//    __v: 0 },
//  { recentPost:
//     { upvote: 0,
//       downvote: 0,
//       _id: 5bf265b99eeb44c4d450b060,
//       user: 5bf265b89eeb44c4d450b05a,
//       thread: 'Test Name 2',
//       title: 'Post Title 1',
//       body: 'Post Body 1',
//       createdAt: 2018-11-19T07:26:49.649Z,
//       __v: 0 },
//    recentUser:
//     { classification: 'Freshman',
//       major: 'Computer Science',
//       avatar: '',
//       authority: 0,
//       _id: 5bf265b89eeb44c4d450b05a,
//       name: [Object],
//       username: 'USER1',
//       email: 'USER1@COM',
//       password: 'PASSWORD',
//       __v: 0 },
//    _id: 5bf265b89eeb44c4d450b058,
//    name: 'Test Name 2',
//    __v: 0 },
//  { recentPost:
//     { upvote: 0,
//       downvote: 0,
//       _id: 5bf265b99eeb44c4d450b061,
//       user: 5bf265b89eeb44c4d450b05e,
//       thread: 'Test Name 3',
//       title: 'Post Title 3',
//       body: 'Post Body 3',
//       createdAt: 2018-11-19T07:26:49.947Z,
//       __v: 0 },
//    recentUser:
//     { classification: 'Freshman',
//       major: 'Computer Science',
//       avatar: '',
//       authority: 0,
//       _id: 5bf265b89eeb44c4d450b05e,
//       name: [Object],
//       username: 'USER3',
//       email: 'USER3@COM',
//       password: 'PASSWORD',
//       __v: 0 },
//    _id: 5bf265b89eeb44c4d450b059,
//    name: 'Test Name 3',
//    __v: 0 } ]