var express = require('express');
var router = express.Router();

const mailer = require('../util/mailer.js').mailer;
const Auth = require('../models/auth.js');

router.get('/ForgotPassword', function (req, res) {
    res.render('ForgotPassword', {
        pageTitle: "Reset Password",
        pageID: "Reset Page",
        Location: "../"
    });

});

router.post('/ForgotPassword', function (req, res, next) {
    if (req.body.Button == 'Reset') {
        mailer(req.body.email, function(err, msgId) {
            if (err) return next(err);
            console.log(msgId);

            res.render('ValidateResetPassword', {
                pageTitle: "Validate Reset Password",
                pageID: "Validate Reset Page",
                Location: "../",
                error: ''
            });
        });
    } else if (req.body.Button == 'Validate') {
        Auth.findOne({ token: req.body.code }, function(err, auth) {
            if (err) return next(err);
            console.log(auth);

            if (auth && (Date.now() < auth.createAt)) {
                console.log(`${auth.token}, ${auth.createAt}`);
                res.render('ChangePassword', {
                    pageTitle: "Change Password",
                    pageID: "Change Password Page",
                    Location: "../",
                    ConfirmOldPassword: 'False'
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
    }
});

module.exports = router;
