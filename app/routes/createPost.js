var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var $ = require("jquery");

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
        // req.session.redirect = '/CreatePost';
        res.redirect('login');
    }
});

router.post('/CreatePost', function (req, res, next) {
    console.log(req.body);

    if (req.session.user) {
        Post.create({ user: req.session.user, thread: TODO, title: TODO, body: req.body.body }, function(err, post) {
            if (err) return next(err);
    
            console.log(post);
            // res.render('CreatePost', {
            //     pageTitle: "CreatePost",
            //     pageID: "Create Post",
            //     Location: "../",\\\\\\\\\\\\\\\
            //     Username: req.session.user,
            //     Data: req.body.url
            // });
            
            Thread.findOneAndUpdate({ name: TODO }, { recentPost: TODO, recentUser: req.session.user}, 
                { new: true },
                function (err, thread) {
                    if (err) return next(err);

                    console.log(thread);
                    res.redirect(`/Thread/:${TODO}/:${TODO}`);
                });
        });
    } else {
        res.redirect('/login');
    }
});
module.exports = router;
//req.session.user
