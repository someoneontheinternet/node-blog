var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register', { msg : null });
});

// Login
router.get('/login', function(req, res){
	res.render('login', {err_msg : null });
});

router.get('/login-fail', function(req, res) {
	res.render('login', { err_msg : "The Username or Password is Incorrect!" });
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register', { msg : errors });
		console.log(errors);
	} else {

		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			permission: 1,
			profile_pic: "unknown.png",
			subscribed: [
				{
					username: "admin"
				}
			]
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		var message = [
			{ msg: "You can now login."}
		];

		res.render('register', { msg :  message });

	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login-fail',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login-fail', failureFlash: false}),
  function(req, res) {
    res.redirect('/');
  });

// Normal Login
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login-fail', failureFlash: false}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

module.exports = router;
