var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');

router.get('/', function (req, res, next) {

    if (req.session.user) {
        Thread.list(function(err, threads) {
            if (err) return next(err);
            // thread.recentPost
            // thread.recentUser
            console.log(threads[0]);
            res.render('index', {
                pageTitle: "Home",
                pageID: "Home Page",
                Location: "../",
                Username: req.session.user,
                Threads: threads
            });
        });
    } else {
        res.redirect('login');
    }
});

module.exports = router;
//req.session.user
