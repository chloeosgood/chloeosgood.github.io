var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
    var MongoClient = require('mongodb').MongoClient;

                var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";
                MongoClient.connect(uri, function(err, client){
                    //error checking
                    if(err){
                        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
                    }
                    console.log('Connected...');;

                   // perform actions on the collection object
                    client.db("users").collection("user").find({}).toArray(function(err,result){
                       if(err) throw err;
                        console.log(result);
                    });
                   client.close();
                });
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