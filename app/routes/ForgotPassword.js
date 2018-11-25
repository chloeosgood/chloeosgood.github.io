var express = require('express');
var router = express.Router();

const mailer = require('../util/mailer.js').mailer;
const Auth = require('../models/auth.js');
const User = require('../models/user.js');
var email = '';

router.get('/ForgotPassword', function (req, res) {
    res.render('ForgotPassword', {
        pageTitle: "Reset Password",
        pageID: "Reset Page",
        Location: "../"
    });

});

router.post('/ForgotPassword', function (req, res, next) {
    if (req.body.Button == 'Reset') {
        mailer(req.body.email, function (err, msgId) {
            if (err) return next(err);
            //console.log(msgId);

            res.render('ValidateResetPassword', {
                pageTitle: "Validate Reset Password",
                pageID: "Validate Reset Page",
                Location: "../",
                error: ''
            });
        });
    } else if (req.body.Button == 'Validate') {
        Auth.findOne({
            token: req.body.code
        }, function (err, auth) {
            if (err) return next(err);
            //console.log(auth);

            if (auth && (Date.now() < auth.createAt)) {
                //console.log(`${auth.token}, ${auth.createAt}`);
                email = auth.email;
                res.render('ChangePassword', {
                    pageTitle: "Change Password",
                    pageID: "Change Password Page",
                    Location: "../",
                    ConfirmOldPassword: 'False',
                    error: ''
                });
            } else {
                res.render('ValidateResetPassword', {
                    pageTitle: "Validate Reset Password",
                    pageID: "Validate Reset Page",
                    Location: "../",
                    error: 'Invalid Code'
                });
            }
        });
    } else if (req.body.Button == 'Change') {
        //console.log(req.body);
        if (req.body.password_1 == req.body.password_2) {
            //req.body.password
            //req.body.password_2
            User.findOneAndUpdate({
                email: email
            }, {
                password: req.body.password_1
            }, function (err, doc) {
                
                res.render('Login', {
                    pageTitle: "Login",
                    pageID: "Log in",
                    Location: "../",
                    error: '*Password Reset*'
                });
                Auth.deleteOne({email: email},function(err){
                    if(err) return next(err);
                });
                email = '';
            });
        }
        else{
            res.render('ChangePassword', {
                    pageTitle: "Change Password",
                    pageID: "Change Password Page",
                    Location: "../",
                    ConfirmOldPassword: 'False',
                    error: 'Passwords Do no match'
                });
        }
    }
});
module.exports = router;
