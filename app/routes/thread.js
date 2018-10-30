var express = require('express');
var router = express.Router();

router.get('/Thread', function(req, res){
    res.render('Thread',{
        pageTitle: "Thread",
        pageID: "Thread Page",
        Location: "../"
    })
});
module.exports = router;