var express = require('express');
var router = express.Router();

const User = require('../models/user.js');
const Post = require('../models/post.js');

router.get('/User/:Username', function (req, res,next) {
    if(req.params.Username == "img_avatar4.png")
        return;
    if (req.session.user) {
        //i would like all posts with the given username also be passed through to the page in the
        //part that says posts. should just list all the posts.
        User.findOne({ username: req.params.Username}, function(err, user) {
            if(err)
                return next(err);
            Post.find( {user: user._id}, function(err, posts) {
                if(err)
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
                    Posts: posts
                });
            });
        });
    } else
        {
            req.session.redirect = '/User/'+req.params.Username;
            res.redirect('/login');
        }
        
});
module.exports = router;
