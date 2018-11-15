var express = require('express');
var router = express.Router();

router.get('/CreatePost', function (req, res) {
    if (req.session.user) {
        res.render('CreatePost', {
            pageTitle: "CreatePost",
            pageID: "Create Post",
            Location: "../",
            Username: req.session.user
        });
    } else {
        res.redirect('login');
    }
});
module.exports = router;
//req.session.user