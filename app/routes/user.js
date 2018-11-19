var express = require('express');
var router = express.Router();

const User = require('../models/user.js');

router.get('/User', function (req, res) {
    if (req.session.user) {
        User.findOne({ username: req.session.user}, function(err, user) {
            res.render('UserPage', {
                pageTitle: "User",
                pageID: "User Page",
                Location: "../",
                Username: req.session.user,
                name: `${user.name.firstname} ${user.name.lastname}`,
                major: user.major,
                classification: user.classification
            });
        });
    } else
        {
            req.session.redirect = '/User';
            res.redirect('/login');
        }
        
});
module.exports = router;
