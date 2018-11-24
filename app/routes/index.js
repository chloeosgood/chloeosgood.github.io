var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');

router.get('/', function (req, res, next) {

    req.session.user = 'bstehling';

    if (req.session.user) {
        //this should sort so that the most recent posts are at the top
        Thread.list(function(err, threads) {
            if (err) return next(err);
            //console.log(threads[0]);
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
