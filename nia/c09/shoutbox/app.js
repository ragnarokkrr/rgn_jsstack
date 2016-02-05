var debug = require('debug')('shoutbox');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//===========================================

var cookieSession = require('cookie-session');
var methodOverride = require('method-override');
var session = require('express-session');

var register = require('./routes/register');
var login = require('./routes/login');
var entries = require('./routes/entries');
var api = require('./routes/api');

var messages = require('./lib/messages');
var user = require('./lib/middleware/user');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');

var httpBasicAuth = require('./lib/middleware/httpBasicAuth');




//===========================================


var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

//===========================================

//app.use(cookieSession({ secret: 'myapp_sid' }));
app.use(session({
	  secret: 'keyboard cat',
	  name: 'sid',
	  cookie: { secure: false},
	  resave: true,
	  saveUninitialized: true
	})); //https://github.com/expressjs/session/issues/123

//===========================================

//===========================================
//app.use('/api', httpBasicAuth.realm);
//app.use('/api', httpBasicAuth.checkAuth);

app.use(user);
app.use(messages);
//===========================================

//app.use('/', routes);
//app.use('/users', users);

//===========================================

//app.get('/api/user/:id', api.user);
//app.post('/api/entry', entries.submit);

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);

app.get('/logout', login.logout);

app.get('/post', entries.form);

app.post('/post',
		validate.required('entry[title]'),
		validate.lengthAbove('entry[title]', 4),
		entries.submit);

app.get('/:page?', page(Entry.count, 5), entries.list);

/*
app.post('/post', 
		requireEntryTitle,
		requireEntryTitleLengthAbove(4),
		entries.submit);

function requireEntryTitle(req, res, next) {
	var title = req.body.entry.title;
	if (title) {
		next();
	} else {
		res.error("Title is required.");
		res.redirect('back');
	}
}

function requireEntryTitleLengthAbove(len) {
	return function(req, res, next) {
		var title = req.body.entry.title;
		if (title.length > len) {
			next();
		} else {
			res.error("Title must be longer than " + len);
			res.redirect('back');
		}
	}
}
*/

// ===========================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

//module.exports = app;

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

