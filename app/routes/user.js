var express = require('express');
var router = express.Router();

router.get('/User', function (req, res) {
    if (req.session.user) {
        res.render('UserPage', {
            pageTitle: "User",
            pageID: "User Page",
            Location: "../",
            Username: req.session.user,
            name: "Name",
            major: "Major",
            classification: "classification"
        })
    } else
        {
            req.session.redirect = '/User';
            res.redirect('/login');
        }
        
});
module.exports = router;
