var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var ioServer = require('socket.io');
var request = require('request');
var fs = require('fs');

var dashboard = require('./routes/dashboard');
var index = require('./routes/index');
var rawData = require('./routes/rawdata');
var festivalMap = require('./routes/festivalmap');
var heatmapData = require('./public/js/data.js');
var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);
app.use('/image', index);
app.use('/rawdata', rawData);
app.use('/festivalmap', festivalMap);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
newData = JSON.parse(heatmapData);
var index = 1;
var io = ioServer(server);
io.on('connection',function(socket){
    socket.on('get data', function(){
      var data = newData[index];
      socket.emit('send data', data);
      index === newData.length - 1? index=0 : index+=1;
    })
});

module.exports = server;
