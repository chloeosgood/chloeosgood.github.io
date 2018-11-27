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
        //check username
        User.countDocuments({
            username: req.body.username
        }, function (err, count) {
            if (count > 0) {
                //uname exists
                return res.render('SignUp', {
                    pageTitle: "SignUp",
                    pageID: "SignUp",
                    Location: "../",
                    error: '*Username already Exists*'
                });
            }
        });

        //check email exists
        User.countDocuments({
            email: req.body.email
        }, function (err, count) {
            if (count > 0) {
                //email exists
                return res.render('SignUp', {
                    pageTitle: "SignUp",
                    pageID: "SignUp",
                    Location: "../",
                    error: '*Email already Exists*'
                });
            }
        });


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
                console.log(err);
            } else {
                //console.log('User Registered');
                //console.log(req.body.classification);
            }
        });



        return res.render('login', {
            pageTitle: "login",
            pageID: "login",
            Location: "../",
            error: 'Account Created. Please Log in With New Account'
        })

    }
});

module.exports = router;
