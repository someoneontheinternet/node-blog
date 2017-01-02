console.log("Server Started...");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

console.log("Connecting to Mongodb");

var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin@ds051873.mlab.com:51873/blog");
var db = mongoose.connection;

console.log("Removing all sessions");

var sessionSchema = new mongoose.Schema({});
var PassedSessions = mongoose.model('session', sessionSchema);
// Remove all session at start
PassedSessions.remove({}, function(err) {
  if (err) {
    console.log("ERROR: Failed to drop all expired sessions.");
  }
});
PassedSessions.collection.dropAllIndexes(function (err) {
  if (err) {
    console.log("ERROR: Failed to drop indeces.");
  }
});

var MongoStore = require('connect-mongo')(session);

console.log("Initializing app..");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var opt = {
  secret: 'nx bwhw gpsum xhpj ll owaw stjzh kogh',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    url: 'mongodb://session:session@ds051873.mlab.com:51873/blog'
  }),
  cookie: { maxAge: 60000 }
}

// Express Session
app.use(session(opt));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

console.log("Done");
console.log("Creating routes...");

// Routes
var blog = require('./routes/blog');
var comment = require('./routes/comment');
var users = require('./routes/users');

app.get('/', function(req, res) {
  res.render('index', { userInfo: req.user });
  console.log(req.user);
});

app.use('/db/blog', blog);
app.use('/db/comment', comment);
app.use('/', users);

// TESTING
app.get('/blog', function(req, res) {
  res.render('blog', { userInfo: req.user });
});

app.get('*', function(req, res) {
  res.render('404');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
