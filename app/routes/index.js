var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    if (req.session.user) {
        res.render('index', {
            pageTitle: "Home",
            pageID: "Home Page",
            Location: "../",
            Username: req.session.user
        });
    } else {
        res.redirect('login');
    }
});

module.exports = router;
//req.session.user
