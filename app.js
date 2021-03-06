var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/main');
var users = require('./routes/users');

var login = require('./routes/login');
var register = require('./routes/register');
var index = require('./routes/index');

var test = require('./routes/test');
var adjust = require('./routes/adjust');

var app = express();

// set session
// use MemcachedStore to save session data
var MemcachedStore = require('connect-memcached')(session);

app.use(cookieParser('パスフレーズ'));

app.use(session({
    key: 'sid',
    cookie: {},
    store: new MemcachedStore(),
    resave: true,
    saveUninitialized: true,
    secret: 'mysecretkey'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/login', login);
app.use('/register', register);
app.use('/index', index);

app.use('/test', test);
app.use('/adjust', adjust);

/// catch 404 and forwarding to error handler
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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = 3500;

app.listen(port, function () {
    console.log('Start project on port '+ port)
});

module.exports = app;
