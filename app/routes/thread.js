var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');

router.get('/Thread', function (req, res) {
    if (req.session.user) {
        Post.findOne({ thread: 'Test Name 2' }, function(err, _post) {
            console.log(err);
            Post.findOne({ _id: _post._id })
            .populate('user')
            .exec(function(err, post) {
                console.log(err);

                Comment.find({ post: post._id })
                .populate('user')
                .exec(function(err, comments) {
                    console.log(err);

                    res.render('Thread', {
                        pageTitle: "Thread",
                        pageID: "Thread Page",
                        Location: "../",
                        Username: req.session.user,
                        Post: post,
                        Comments: comments
                    });
                });
            });
        });
    } else
        {
            req.session.redirect = '/Thread';
            res.redirect('/login'); 
        }
        
});

router.get('/Thread/:postId', function(req, res, next) {
    if (req.session.user) {
        Post.findOne({ _id: req.params.postId })
        .populate('user')
        .exec(function(err, post) {
            if (err) return next(err);

            Comment.find({ post: post._id })
            .populate('user')
            .exec(function(err, comments) {
                if (err) return next(err);

                res.render('Thread', {
                    pageTitle: "Thread",
                    pageID: "Thread Page",
                    Location: "../",
                    Username: req.session.user,
                    Post: post,
                    Comments: comments
                });
            });
        });
    } else {
        req.session.redirect = `/Thread/${req.params.postId}`;
        res.redirect('/login');
        
    }
});

router.get('/Thread/:postId/addComment', function(req, res, next) {
    if (req.session.user) {
        // TODO
    } else {
        req.session.redirect = `/Thread/${req.params.postId}/addComment`;
        res.redirect('/login');
    }
});

router.post('/Thread/:postId/addComment', function(req, res, next) {
    if (req.session.user) {
        User.findOne({ username: req.session.user }, function(err, user) {
            if (err) return next(err);

            Comment.create({ user: req.session.user._id, post: req.params.postId, text: text }, function(err, comment) {
                if (err) return next(err);
    
                console.log(comment);
            });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
