var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var $ = require("jquery");

const User = require('../models/user.js');
const Thread = require('../models/thread.js');
const Post = require('../models/post.js');

router.get('/CreatePost', function (req, res) {
    if (req.session.user) {
        res.render('CreatePost', {
            pageTitle: "CreatePost",
            pageID: "Create Post",
            Location: "../",
            Username: req.session.user,
            Data: 'Go ahead...'
        });
    } else {
        req.session.redirect = '/CreatePost';
        res.redirect('/login');
    }
});

router.post('/CreatePost', function (req, res, next) {
    console.log(req.body);

    if (req.session.user) {
        User.findOne({
            username: req.session.user
        }, function (err, user) {
            if (err) return next(err);

            Post.create({
                user: user._id,
                thread: req.body.Thread,
                title: req.body.Title,
                body: req.body.post
            }, function (err, post) {
                if (err) return next(err);

                console.log(post);
                // res.render('CreatePost', {
                //     pageTitle: "CreatePost",
                //     pageID: "Create Post",
                //     Location: "../",\\\\\\\\\\\\\\\
                //     Username: req.session.user,
                //     Data: req.body.url
                // });

                Thread.findOneAndUpdate({
                        name: req.body.Thread
                    }, {
                        recentPost: post._id,
                        recentUser: user._id,
                        $inc: { 'count': 1 }
                    }, {
                        new: true
                    },
                    function (err, thread) {
                        if (err) return next(err);
                        if (thread == null)
                            Thread.create({
                                name: req.body.Thread,
                                recentPost: post._id,
                                recentUser: user._id,
                                count: 1
                            }, function (err, thread) {
                                if (err) return next(err);
                            });
                        res.redirect(`/Thread/${req.body.thread}/${post._id}`);
                    });
            });
        });
    } else {
        res.redirect('/login');
    }
});
module.exports = router;
//req.session.user
