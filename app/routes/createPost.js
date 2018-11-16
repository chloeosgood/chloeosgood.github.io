var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var $ = require("jquery");

router.get('/CreatePost', function (req, res) {
    if (req.session.user) {
        res.render('CreatePost', {
            pageTitle: "CreatePost",
            pageID: "Create Post",
            Location: "../",
            Username: req.session.user,
            Data: 'Go ahead...'
        });
    } else {
        req.session.redirect = '/CreatePost';
        res.redirect('login');
    }
});

router.post('/CreatePost', function (req, res, next) {
    console.log(req.body);
    res.render('CreatePost', {
        pageTitle: "CreatePost",
        pageID: "Create Post",
        Location: "../",
        Username: req.session.user,
        Data: req.body.url
    });

});
module.exports = router;
//req.session.user
