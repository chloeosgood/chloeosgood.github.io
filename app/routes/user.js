var express = require('express');
var router = express.Router();

const User = require('../models/user.js');

router.get('/User/:Username', function (req, res) {
    if(req.params.Username == "img_avatar4.png")
        return;
    if (req.session.user) {
        User.findOne({ username: req.params.Username}, function(err, user) {
            res.render('UserPage', {
                pageTitle: "User",
                pageID: "User Page",
                Location: "../",
                Username: user.username,
                name: `${user.name.firstname} ${user.name.lastname}`,
                major: user.major,
                classification: user.classification
            });
        });
    } else
        {
            req.session.redirect = '/User/'+req.params.Username;
            res.redirect('/login');
        }
        
});
module.exports = router;
