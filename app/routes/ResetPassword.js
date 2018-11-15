var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const User = require('../models/user.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

//test queries for reset password

//find user and update password
User.findOneAndUpdate({
    username: req.body.username,
    password: req.body.pass
}, {
    password: req.body.pass2
},
function (err, doc) {
    if (err) throw err;
    console.log(doc);

}
});
