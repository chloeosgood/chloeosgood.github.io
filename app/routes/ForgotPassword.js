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
    var mailOptions = {
        from: 'inkpotforumproject@gmail.com',
        to: req.body.email,
        subject: 'Validate Forgot Password',
        text: 'Sending a test email to validate password'
    };
    res.redirect('/ValidateResetPassword');

});


router.get('/validateResetPassword', function (req, res) {
    res.render('ValidateResetPassword', {
        pageTitle: "Validate Reset Password",
        pageID: "Validate Reset Page",
        Location: "../"
    });
});
module.exports = router;
