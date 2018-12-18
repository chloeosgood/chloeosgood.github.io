var express = require('express');
var router = express.Router();

const User = require('../models/user.js');
const Post = require('../models/post.js');

router.get('/User/:Username', function (req, res, next) {
    if (req.params.Username == "img_avatar4.png")
        return;
    if (req.session.user) {
        var isSame = 'false';
        if (req.session.user == req.params.Username)
            isSame = 'true'
        User.findOne({
            username: req.params.Username
        }, function (err, user) {
            if (err)
                return next(err);
            Post.find({
                user: user._id
            }, function (err, posts) {
                if (err)
                    return next(err);
                //console.log(posts);
                res.render('UserPage', {
                    pageTitle: "User",
                    pageID: "User Page",
                    Location: "../",
                    Username: req.session.user,
                    CurrentUser: user.username,
                    name: `${user.name.firstname} ${user.name.lastname}`,
                    major: user.major,
                    classification: user.classification,
                    Posts: posts,
                    isSame: isSame
                });
            });
        });
    } else {
        req.session.redirect = '/User/' + req.params.Username;
        res.redirect('/login');
    }

});

router.post('/User/profile', function (req, res, next) {
    console.log(req.body.data);
    res.send({
        msg: 'hello'
    });

});
module.exports = router;
