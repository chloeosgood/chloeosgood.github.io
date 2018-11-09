var mongoose = require('mongoose');
//connect to mongoDB Atlas
mongoose.connect('mongodb+srv://forum-admin:flyingmongooses@forum-cluster-main-pnxfd.mongodb.net/test?retryWrites=true');
//schema definition
var UserSchema = new mongoose.Schema({
    uname: String,
    fname: String,
    lname: String,                              
    psw: String,
    email: String,
    major: String,
    clf: String,
    isAdmin: Number
    //isAdmin 0 by default(not admin)
});

var User = mongoose.model('user', UserSchema);

//add new user to db (register)
var addUser = new User({
    uname: req.body.username,
    fname: req.body.first_name,
    lname: req.body.last_name,
    psw: req.body.password,
    email: req.body.email,
    major: TODO,
    clf: req.body.classification,
    isAdmin: 0
});

addUser.save(function(err, user){ //adds callback fn in case user not saved
    if(err){
        console.log('Problem registering user');
    }else{
        console.log('User added..');
        consle.log(user);
    }
});