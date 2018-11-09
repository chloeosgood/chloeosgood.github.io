var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/SignUp', function (req, res) {
    res.render('SignUp', {
        pageTitle: "SignUp",
        pageID: "Sign Up Page",
        Location: "../",
        error: ""
    })
});

router.post('/SignUp', function (req, res) {

    console.log(req.body);
    if ((req.body.password_1 != req.body.password_2)) {
        res.render('SignUp', {
            pageTitle: "SignUp",
            pageID: "SignUp",
            Location: "../",
            error: '*Passwords do not match*'
        })
    } else {
        var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";
        MongoClient.connect(uri, function (err, client) {
            //error checking
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
            }

            // perform actions on the collection object
            client.db("forum").collection("user").find({
                uname: req.body.username

            }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result)
                if (result.length == 1) {
                    return res.render('SignUp', {
                        pageTitle: "SignUp",
                        pageID: "SignUp",
                        Location: "../",
                        error: '*Username already Exists*'
                    })
                }
            });

            client.db("forum").collection("user").find({
                email: req.body.email

            }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result)
                if (result.length == 1) {
                    return res.render('SignUp', {
                        pageTitle: "SignUp",
                        pageID: "SignUp",
                        Location: "../",
                        error: '*Email already Exists*'
                    })
                }
            });

            var sname = req.body.first_name + " " + req.body.last_name;
            client.db("forum").collection("user").insertOne({
                uname: req.body.username,
                scname: sname,
                psw: req.body.password_1,
                email: req.body.email,
                info: {
                    major: req.body.major,
                    class: req.body.classification
                },
                isAdmin: 0
            });
            
            
            
            client.close();
            return res.render('login', {
                        pageTitle: "login",
                        pageID: "login",
                        Location: "../",
                        error: 'Account Created. Please Log in With New Account'
                    })
        });
    }
});

module.exports = router;
