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
    if ((req.body.data.pass1 != req.body.data.pass2)) {
        res.send('Password');
    } else {
        var hasval = false;
        //check username
        User.findOne({
            username: req.body.data.username
        }, function (err, count) {
            //console.log(count);
            if (count != null) {
                //uname exists
                res.send('Username');
            } else {
                User.findOne({
                    email: req.body.data.email
                }, function (err, count) {
                    //console.log(count);
                    if (count != null) {
                        //email exists
                        res.send('Email');
                    } else {
                        User.create({
                            name: {
                                firstname: req.body.data.firstname,
                                lastname: req.body.data.lastname,
                            },
                            username: req.body.data.username,
                            email: req.body.data.email,
                            password: req.body.data.pass2,
                            classification: req.body.data.classification,
                            major: req.body.data.major,
                            avatar: '',
                            authority: 0 //set to 0 by default
                        }, function (err, user) {
                            //console.log(user)
                            if (err) {
                                console.log(err);
                                res.send('error');
                            } else {
                                res.send('Registered');
                                console.log('User Registered');
                                
                                //console.log(req.body.classification);
                            }
                        });
                    }
                });
            }
        });

        //check email exists


        if (hasval == false) {

        }
    }
});

module.exports = router;
