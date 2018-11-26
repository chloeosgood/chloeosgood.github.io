var express = require('express');
var router = express.Router();

const Thread = require('../models/thread.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

//Search
router.get('/Search',function(req,res,next) {
    if(req.session.user)
    {
        res.render('SearchMenu', {
            pageTitle: "SearchMenu",
            pageID: "Search Page",
            Location: "../",
            Username: req.session.user
        });
    }
    else
    {
        req.session.redirect = '/Search';
        res.redirect('/login');
    }
});

router.get('/Search/:search_key', function (req, res, next) {
    var findThread = true;
    var findUser = true;
    var findPost = true;
    var findComment = true;

    var SearchResultsThread;
    var SearchResultsUser;
    var SearchResultsPost;
    var SearchResultsComment;


    if (req.session.user) {

        if(req.params.search_key == "")
        {
            console.log("Empty Search");
            //Give search error we need you to put in a variable
            return;
        }

        console.log("\nSearch Key:" + req.params.search_key);

        if(findThread)
        {
            Thread.find({name: req.params.search_key},function(err, search_results_thread) {
                if (err) return next(err);

                console.log("\nThread Search Results\n");
                console.log(search_results_thread);
                SearchResultsThread = search_results_thread;
            });
        }

        if(findUser)
        {
            User.find({username: req.params.search_key},function(err, search_results_user) {
                if (err) return next(err);

                console.log("\nUser Search Results\n");
                console.log(search_results_user);
                SearchResultsUser = search_results_user;
            });
        }
/*
        if(findPost)
        {
            Post.find({title: req.params.search_key},function(err, search_results_post) {
                if (err) return next(err);

                console.log("\nThread Search Results\n");
                console.log(search_results_thread);
                SearchResultsThread = search_results_thread;
            });
        }
*/
        res.render('ShowSearch', {
            pageTitle: "ShowSearch",
            pageID: "Search Page",
            Location: "../",
            Username: req.session.user,
            SearchResultsThread: SearchResultsThread,
            SearchResultsUser: SearchResultsUser,
            SearchResultsPost: SearchResultsPost
        });

    } else {
        req.session.redirect = '/ShowSearch/' + req.params.search_key;
        res.redirect('/login');
    }
});

module.exports = router;