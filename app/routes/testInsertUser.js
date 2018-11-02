var express = require('express');
var router = express.Router();
var assert = require('assert');

router.get('/test', function(req, res){
    var MongoClient = require('mongodb').MongoClient;

                var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";
                MongoClient.connect(uri, function(err, client){
                    //error checking
                    if(err){
                        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
                    }
                    console.log('Connected...');;

                   // perform actions on the collection object
                    client.db("forum").collection("user").insertOne({uname: TODO, scname: TODO, psw: TODO, email: TODO}){
                       if(err) throw err;
                        console.log(result);
                        client.close();
                    });
                });
    res.render('Login',{
        pageTitle: "Login",
        pageID: "Log in",
        Location: "../"
    })
});
module.exports = router;