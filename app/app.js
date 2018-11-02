var express = require('express');
var reload = require('reload');
var app = express();
var http = require('http');
var server = http.createServer();

app.set('port', 5656);
app.set('view engine', 'ejs');
app.set('views',"app/views");


app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/thread'));
app.use(require('./routes/login'));
app.use(require('./routes/test'));


var server = app.listen(5656, function(){
    console.log("Active");
});


reload(app,server);