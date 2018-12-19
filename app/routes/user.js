var express = require('express');
var router = express.Router();
var base64Img = require('base64-img');
var path = require('path');

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
                    isSame: isSame,
                    profilepicture: user.avatar
                });
            });
        });
    } else {
        req.session.redirect = '/User/' + req.params.Username;
        res.redirect('/login');
    }

});

router.post('/User/profile', function (req, res, next) {
    console.log(req.session.user);
    var local = path.join(__dirname, '../');
    console.log(local);
    base64Img.img(req.body.data.image, local+'/public/Users/ProfilePictures', req.session.user, function(err, filepath, next) {
        if(err)return next(err);
        else{
            User.findOneAndUpdate({
                username: req.session.user
            },{
                avatar: req.session.user+".png"
            },function(err, User){
                if(err)return next(err);
            })
        }
    });
    res.send({
        msg: 'hello'
    });

});
module.exports = router;
