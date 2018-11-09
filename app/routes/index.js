var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (true) {
        res.render('index', {
            pageTitle: "Home",
            pageID: "Home Page",
            Location: "../"
        })
    } else {
        res.redirect('login');
    }

});


module.exports = router;
//req.session.user