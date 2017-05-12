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


var io = ioServer(server);
io.on('connection',function(socket){
    socket.on('new heatmap', function(img){
        var base64Data = img.replace('data:image/png;base64,', "");
        fs.writeFile("./public/img/heatmap.png", base64Data, 'base64', function(err) {
            if (err) throw err;
        });

        request('http://localhost:3000/img/heatmap.png', function(e, r, data){
            var url = 'http://pictaculous.com/api/1.0/?image='+data;

            request(url,function(error, response, body){
                // body = JSON.parse(body);
                console.log(body);
                // socket.emit('new image', body);
            });
        });
    });

    socket.on('get data', function(){
      var data = [
  			{
  				"red" : (function(){return Math.ceil(Math.random()*100)}()),
  				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
  				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
  				"green":(function(){return Math.ceil(Math.random()*100)}())
  			},
  			{
  				"red" : (function(){return Math.ceil(Math.random()*100)}()),
  				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
  				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
  				"green":(function(){return Math.ceil(Math.random()*100)}())
  			},
  			{
  				"red" : (function(){return Math.ceil(Math.random()*100)}()),
  				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
  				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
  				"green":(function(){return Math.ceil(Math.random()*100)}())
  			},
  			{
  				"red" : (function(){return Math.ceil(Math.random()*100)}()),
  				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
  				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
  				"green":(function(){return Math.ceil(Math.random()*100)}())
  			}
      ];
      socket.emit('send data', data);
    })
});

module.exports = server;
