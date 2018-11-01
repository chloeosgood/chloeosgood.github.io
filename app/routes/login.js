var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/login', function (req, res) {
    res.render('Login', {
        pageTitle: "Login",
        pageID: "Log in",
        Location: "../",
        error: ""
    })
});
module.exports = router;

router.post('/login', function (req, res, next) {
    var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";
    MongoClient.connect(uri, function (err, client) {
        //error checking
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }

        // perform actions on the collection object
        client.db("forum").collection("user").find({
            'uname': req.body.username,
            'psw': req.body.pass
        }).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.render('Login', {
                    pageTitle: "Login",
                    pageID: "Log in",
                    Location: "../",
                    error: '*Username and password does not exist'
                })
            } else{
                req.session.user = req.body.username;
                console.log(req.cookie);
                res.redirect('/');
            }
        });
        client.close();
    });
    
    
});

module.exports = router;
