var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
    res.render('Login',{
        pageTitle: "Login",
        pageID: "Log in",
        Location: "../"
    })
});
module.exports = router;

router.get('/logout', function(req, res){
    
});

module.exports = router;