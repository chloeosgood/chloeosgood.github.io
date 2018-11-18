var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');

router.get('/Thread', function (req, res) {
    if (req.session.user) {
        Thread.list(function(err, threads) {
            if (err) return next(err);

            // thread.recentPost
            // thread.recentUser
            console.log(threads);
            res.render('Thread', {
                pageTitle: "Thread",
                pageID: "Thread Page",
                Location: "../",
                Username: req.session.user,
                Threads: threads
            });
        });
    } else
        {
            // req.session.redirect = '/Thread';
            res.redirect('/login'); 
        }
        
});

router.get('/Thread/:thread/:postId', function(req, res, next) {
    if (req.session.user) {
        Post.findOne({ _id: req.params.postId }, function(err, post) {
            if (err) return next(err);

            res.render('Post', {
                pageTitle: post.title,
                pageID: `Post${post._id}`,
                Location: "../",
                Username: req.session.user,
                Post: post
            });
        })
    } else {
        res.redirect('/login');
    }
});

router.get('/Thread/:thread/:postId/addComment', function(req, res, next) {
    if (req.session.user) {
        // TO DO
    } else {
        res.redirect('/login');
    }
});

router.post('/Thread/:thread/:postId/addComment', function(req, res, next) {
    if (req.session.user) {
        Comment.create({ user: req.session.user._id, post: req.params.postId, text: text }, function(err, comment) {
            if (err) return next(err);

            console.log(comment);

        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
