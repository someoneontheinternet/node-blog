const PRODCTION = false;
const PORT = 3000;

console.log("Server Started...");

if (PRODCTION) {
  PORT = 60000;
  console.log("Server is in production mode.");
} else {
  console.log("Server is NOT in production mode.");
}

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
  if (err)
    console.log("ERROR: Failed to drop all expired sessions.");
});

var MongoStore = require('connect-mongo')(session);

console.log("Initializing app..");

var app = express();

// TODO DEV - Disable EJS Caching
if (!PRODCTION) {
  app.disable('view cache');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Logger
if (!PRODCTION) {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var opt = {
  secret: 'nx bwhw gpsum xhpj ll owaw stjzh kogh',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    url: 'mongodb://session:session@ds051873.mlab.com:51873/blog'
  }),
  cookie: { maxAge: 600000 }
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
app.get('/blog/:id', function(req, res) {

  var id = req.params.id;

  console.log(id);

  res.render('blog', { userInfo: req.user, ID: id });

});

app.get('*', function(req, res) {
  res.status(404);
  res.render('404');
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT + ".");
});
