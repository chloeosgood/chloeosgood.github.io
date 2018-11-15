var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');
var nodeMailer = require('nodemailer');

router.get('/ForgotPassword', function (req, res) {
    res.render('ForgotPassword', {
        pageTitle: "Reset Password",
        pageID: "Reset Page",
        Location: "../"
    });

});

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'InkPotForumProject@gmail.com',
        pass: 'FlyingMongooses12'
    }
});

router.post('/ForgotPassword', function (req, res) {
    if (req.body.Button == 'Reset') {
        res.render('ValidateResetPassword', {
            pageTitle: "Validate Reset Password",
            pageID: "Validate Reset Page",
            Location: "../"
        });
    } else if (req.body.Button == 'Validate') {
        res.render('ChangePassword', {
            pageTitle: "Change Password",
            pageID: "Change Password Page",
            Location: "../",
            ConfirmOldPassword: 'False'
        });
    }


});

module.exports = router;
