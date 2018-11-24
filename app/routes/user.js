var express = require('express');
var router = express.Router();

const User = require('../models/user.js');

router.get('/User/:Username', function (req, res) {
    if(req.params.Username == "img_avatar4.png")
        return;
    if (req.session.user) {
        //i would like all posts with the given username also be passed through to the page in the
        //part that says posts. should just list all the posts.
        User.findOne({ username: req.params.Username}, function(err, user) {
            res.render('UserPage', {
                pageTitle: "User",
                pageID: "User Page",
                Location: "../",
                Username: req.session.user,
                CurrentUser: user.username,
                name: `${user.name.firstname} ${user.name.lastname}`,
                major: user.major,
                classification: user.classification,
                Posts: 'Enter list of posts here'
            });
        });
    } else
        {
            req.session.redirect = '/User/'+req.params.Username;
            res.redirect('/login');
        }
        
});
module.exports = router;
