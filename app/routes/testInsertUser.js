var express = require('express');
var router = express.Router();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var uri = "mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true";

router.post('/testInsertUser', function(req, res, next){
    
    //TODO: add html vars for storing in db
    var adduser = {
        uname: TODO,
        scname: TODO,
        psw: TODO, 
        email: TODO,
        isAdmin: 0      //isAdmin set to 0 by default (not admin)
    };
    
    MongoClient.connect(uri, function(err, client) {
        assert.equal(null, err);
        client.db('forum').collection('user').insertOne(adduser, function(err, result){
            assert.equal(null, err);
            console.log('User Inserted');
            client.close();
        });
    });
                        
    res.redirect('/');            
});

module.exports = router;