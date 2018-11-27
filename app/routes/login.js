var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const User = require('../models/user.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/login', function (req, res) {
    res.render('Login', {
        pageTitle: "Login",
        pageID: "Log in",
        Location: "../",
        error: ""
    })
});

module.exports = router;


router.post('/login', function (req, res, next) {

    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (user == null || user.length == 0) {
            res.render('Login', {
                pageTitle: "Login",
                pageID: "Log in",
                Location: "../",
                error: '*Username and password does not exist'
            })
        } else {

            // test a matching password
            user.comparePassword(req.body.pass, function (err, isMatch) {
                if (err) throw err;
            });
            req.session.user = req.body.username;
            //console.log(req.cookie);
            if (req.session.redirect) {
                res.redirect(req.session.redirect);
                req.session.redirect = '/';
            } else
                res.redirect('/');
        }


    });

});

module.exports = router;
