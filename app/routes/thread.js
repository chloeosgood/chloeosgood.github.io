var express = require('express');
var router = express.Router();

router.get('/Thread', function (req, res) {
    if (req.session.user) {
        res.render('Thread', {
            pageTitle: "Thread",
            pageID: "Thread Page",
            Location: "../"
        })
    } else
        res.redirect('/login');
});
module.exports = router;
