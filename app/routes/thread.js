var express = require('express');
var router = express.Router();

router.get('/Thread', function (req, res) {
    if (req.session.user) {
        res.render('Thread', {
            pageTitle: "Thread",
            pageID: "Thread Page",
            Location: "../",
            Username: req.session.user
        })
    } else
        {
            req.session.redirect = '/Thread';
           res.redirect('/login'); 
        }
        
});
module.exports = router;
