var express = require('express');
var router = express.Router();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;


router.get('/Thread', function(req, res){
    res.render('Thread',{
        pageTitle: "Thread",
        pageID: "Thread Page",
        Location: "../"
    })
});

router.get('/Thread', function(req, res){
    
    var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";
    var thread = {tname: 'Sample Thread'} //thread name goes  here
    //or use {post: {title: 'Sample Post 1'}}
    
    //this should display thread along with sub collection of posts when finished
    MongoClient.connect(uri, function(err, client){
        if(err) throw err;
        client.db('forum').collection('thread').find(thread, function(err, result){
            if (err) throw err;
            console.log(result.name);
            client.close();
        });
    });
    
});

module.exports = router;