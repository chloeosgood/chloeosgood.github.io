var express = require('express');
var reload = require('reload');
var app = express();
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');



var server = http.createServer();


app.set('port', 5656);
app.set('view engine', 'ejs');
app.set('views',"app/views");

app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 600000
    }
}));


app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/thread'));
app.use(require('./routes/Login'));
app.use(require('./routes/SignUp'));
app.use(require('./routes/ForgotPassword'));

require('./util/mongoose.js')(); //adds mongoose connection

var server = app.listen(5656, function(){
    console.log("Active");
});


reload(app,server);