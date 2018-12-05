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

router.get('/TestVote', function (req, res, next) {
    res.render('TestVote', {
        like: true,
        test: ''
    });
});

router.post('/Thread/Vote', function (req, res, next) {

    // data from client
    // data { instanceID: { post or comment's ID },
    // instanceType: { 'Post' or 'Comment' },
    // like: { true, false } }

    // Sample

    if (req.session.user) {

        const Voter = (votedList, cb) => {

            const voteOption = {
                $inc: {
                    upvote: 0,
                    downvote: 0
                }
            };

            const processVote = () => {

                // Exist: XNOR, XOR
                // Not Exist
                for (let i = 0; i < votedList.length; i++) {
                    const instance = votedList[i];

                    if (instance.instanceID.equals(req.body.data.instanceID)) {

                        if (instance.like.toString() === req.body.data.like) {

                            assignVote(-1, 0);

                            return updateInstance('XNOR');
                        } else {

                            assignVote(1, -1);

                            return updateInstance('XOR');
                        }
                    }
                }

                assignVote(1, 0);

                return updateInstance('Not Exist');
            };

            const assignVote = (up, down) => {
                voteOption.$inc.upvote = (req.body.data.like === 'true') ? up : down;
                voteOption.$inc.downvote = (req.body.data.like === 'false') ? up : down;

                // console.log(`Assign Vote: ${voteOption.$inc.upvote}, ${voteOption.$inc.downvote}`);
            };

            const updateInstance = (VoteMsg) => {

                //console.log(`VoteMsg: ${VoteMsg}`);

                const instanceCB = function (err, doc) {
                    if (err) return next(err);

                    // console.log(`Updated Instance: ${doc}`);

                    cb(VoteMsg, doc);
                };

                if (req.body.data.instanceType === 'Post') {
                    updatePost(instanceCB);
                } else if (req.body.data.instanceType === 'Comment') {
                    updateComment(instanceCB);
                }
            };

            const updatePost = (instanceCB) => {
                Post.findOneAndUpdate({
                        _id: req.body.data.instanceID
                    }, voteOption, {
                        new: true
                    },
                    instanceCB);
            };

            const updateComment = (instanceCB) => {
                Comment.findOneAndUpdate({
                        _id: req.body.data.instanceID
                    }, voteOption, {
                        new: true
                    },
                    instanceCB);
            };

            processVote(cb);
        };

        User.findOne({
            username: req.session.user
        }, function (err, user) {
            if (err) return next(err);

            if (user) {

                Voter(user.votedList, function (msg, doc) {

                    const updateVotedList = (updateOption, filter = null) => {

                        filter = filter || {
                            new: true
                        };

                        User.findOneAndUpdate({
                                username: req.session.user
                            }, updateOption, filter,
                            function (err, user) {
                                if (err) return next(err);

                                //console.log(`User Voted: ${user}`);

                                // Sucessed in AJAX
                                // req.send({
                                //     msg: 0,
                                //     err: ''
                                // });
                                Post.findOne({
                                    _id: req.body.data.instanceID
                                }, function (err, data) {
                                    if (err) next(err);
                                    else
                                        res.send(data);
                                });
                            });
                    };

                    if (msg === 'XNOR') {
                        updateVotedList({
                            $pull: {
                                votedList: {
                                    instanceID: doc._id
                                }
                            }
                        });
                    } else if (msg === 'XOR') {
                        updateVotedList({
                            $set: {
                                'votedList.$[ele].like': req.body.data.like
                            }
                        }, {
                            new: true,
                            arrayFilters: [{
                                'ele.instanceID': doc._id
                            }]
                        });
                    } else if (msg === 'Not Exist') {
                        updateVotedList({
                            $push: {
                                votedList: {
                                    instanceID: doc._id,
                                    instanceType: req.body.data.instanceType,
                                    like: req.body.data.like
                                }
                            }
                        });
                    }
                });
            } else {
                // #Err: User Not Founds
                res.send({
                    msg: 1,
                    error: 'User Not Founds'
                });
            }
        });

    } else {
        res.redirect('/login');
    }
});

router.post('/Thread/:Threadname/:postId', function (req, res, next) {
    if (req.session.user) {
        User.findOne({
            username: req.session.user
        }, function (err, user) {
            //console.log(user);
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
