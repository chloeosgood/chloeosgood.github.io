var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const Thread = require('../models/thread.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const User = require('../models/user.js');

router.get('/RecentPosts', function (req, res, next) {

    req.session.user = 'jdoe';

    if (req.session.user) {

        Post.recentPosts(function (err, posts) {
            if (err) next(err);

            // console.log(posts.toString());

            res.render('RecentPosts', {
                pageTitle: "RecentPosts",
                pageID: "RecentPosts Page",
                Location: "../",
                Username: req.session.user,
                RecentPosts: posts
            });
        });
    } else {
        req.session.redirect = '/RecentPosts';
        res.redirect('/login');
    }
});

router.get('/Thread', function (req, res) {
    if (req.session.user) {
        //i would like this to have a total of how many posts that are currently
        //in each thread like combine the name of the thread with a count of how many
        //posts there are for each thread. just a simple count nothing fancy :)

        // Threads[i].count
        Thread.listByName(function (err, threads) {
            if (err) return next(err);
            //console.log(threads);
            res.render('ThreadList', {
                pageTitle: "Threads",
                pageID: "Thread Page",
                Location: "../",
                Username: req.session.user,
                Threads: threads
            });
        });

    } else {
        req.session.redirect = '/Thread';
        res.redirect('/login');
    }

});

module.exports = router;
router.get('/Thread/:Threadname', function (req, res, next) {
    if (req.session.user) {
        //should pass through all posts that belong to a thread with name req.params.Threadname
        Post.findByThread(req.params.Threadname, function (err, posts) {
            if (err) return next(err);
            //console.log(posts);
            res.render('Thread', {
                pageTitle: "Thread",
                pageID: "Thread Page",
                Location: "../",
                Username: req.session.user,
                Posts: posts
            });
        });
    } else {
        req.session.redirect = `/Thread/${req.params.Threadname}`;
        res.redirect('/login');

    }
});
module.exports = router;

router.get('/Thread/:Threadname/:postId', function (req, res, next) {
    if (req.session.user) {
        Post.findOne({
                _id: req.params.postId
            })
            .populate('user')
            .exec(function (err, post) {
                if (err) return next(err);

                Comment.find({
                        post: post._id
                    })
                    .populate('user')
                    .exec(function (err, comments) {
                        if (err) return next(err);

                        res.render('Post', {
                            pageTitle: "Post",
                            pageID: "Post Page",
                            Location: "../../",
                            Username: req.session.user,
                            Post: post,
                            Comments: comments,
                            Data: "Type comment..."
                        });
                    });
            });
    } else {
        req.session.redirect = `/Thread/${req.params.Threadname}/${req.params.postId}`;
        res.redirect('/login');

    }
});

router.post('/Thread/Likes', function (req, res, next) {
    //console.log(req.body);
    var dis = 0;
    var lik = 1;
    if(req.body.data.message == 'Disliked')
        dis = -1;
    if(req.body.data.message == 'Unlike')
        lik = -1;
    Post.findOneAndUpdate({
        _id: req.body.data.PostID
    }, {
        $inc: {
            upvote: lik,
            downvote: dis
        }
    }, function (err, post) {
        if (err) next(err);
        else {
            Post.findOne({
                _id: req.body.data.PostID
            }, function (err, data) {
                if (err) next(err);
                else
                    res.send(data);
            });
        }
    });

});
router.post('/Thread/Dislike', function (req, res, next) {
    //console.log(req.body);
    var lik = 0;
    var dis = 1;
    if(req.body.data.message == 'Liked')
        lik = -1;
    else if(req.body.data.message == 'Undislike')
        dis = -1;
    console.log(lik + " " + dis + " " + req.body.data.message);
    Post.findOneAndUpdate({
        _id: req.body.data.PostID
    }, {
        $inc: {
            downvote: dis,
            upvote: lik
        }
    }, function (err, post) {
        if (err) next(err);
        else {
            Post.findOne({
                _id: req.body.data.PostID
            }, function (err, data) {
                if (err) next(err);
                else
                    res.send(data);
            });
        }
    });

});

module.exports = router;

router.post('/Thread/:Threadname/:postId', function (req, res, next) {
    if (req.session.user) {
        User.findOne({
            username: req.session.user
        }, function (err, user) {
            console.log(user);
            if (err) return next(err);

            Comment.create({
                user: user._id,
                post: req.params.postId,
                text: req.body.post
            }, function (err, comment) {
                if (err) return next(err);

                res.redirect('/Thread/' + req.params.Threadname + '/' + req.params.postId);
            });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
