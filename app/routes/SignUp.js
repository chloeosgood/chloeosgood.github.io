var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const User = require('../models/user.js');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/SignUp', function (req, res) {
    res.render('SignUp', {
        pageTitle: "SignUp",
        pageID: "Sign Up Page",
        Location: "../",
        error: ""
    })
});

router.post('/SignUp', function (req, res) {

    //console.log(req.body);
    if ((req.body.password_1 != req.body.password_2)) {
        res.render('SignUp', {
            pageTitle: "SignUp",
            pageID: "SignUp",
            Location: "../",
            error: '*Passwords do not match*'
        })
    } else {
        var hasval = false;
        //check username
        /*User.findOne({
            username: req.body.username
        }, function (err, count) {
            console.log(count);
            if (count != null) {
                //uname exists
                hasval = true;
                res.render('SignUp', {
                    pageTitle: "SignUp",
                    pageID: "SignUp",
                    Location: "../",
                    error: '*Username already Exists*'
                });

            }
        });

        //check email exists
        User.findOne({
            email: req.body.email
        }, function (err, count) {
            console.log(count);
            if (count != null) {
                //email exists
                hasval = true;
                res.render('SignUp', {
                    pageTitle: "SignUp",
                    pageID: "SignUp",
                    Location: "../",
                    error: '*Email already Exists*'
                });

            }
        });*/

        if (hasval == false) {
            User.create({
                name: {
                    firstname: req.body.first_name,
                    lastname: req.body.last_name,
                },
                username: req.body.username,
                email: req.body.email,
                password: req.body.password_1,
                classification: req.body.classification,
                major: req.body.major,
                avatar: '',
                authority: 0 //set to 0 by default
            }, function (err, user) {
                //console.log(user)
                if (err) {
                    res.render('SignUp', {
                        pageTitle: "SignUp",
                        pageID: "SignUp",
                        Location: "../",
                        error: '*Email or username already Exists*'
                    });
                } else {
                    res.render('login', {
                        pageTitle: "login",
                        pageID: "login",
                        Location: "../",
                        error: 'Account Created. Please Log in With New Account'
                    });
                    console.log('User Registered');
                    //console.log(req.body.classification);
                }
            });
        }
    }
});

module.exports = router;
