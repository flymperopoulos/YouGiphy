// requirements
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./authentication.js');
var ensureAuthenticated = require('./routes/ensureAuthenticated.js');
var Person = require(path.join(__dirname,'./models/personModel'));

var index = require('./routes/index');

// serialize passport
passport.serializeUser(function(user, done) {
	console.log('serializeUser: ' + user._id)
	done(null, user._id);
});

// deserialize passport
passport.deserializeUser(function(id, done) {
	Person.findById(id, function(err, user){
 		console.log(user)
 		if(!err) done(null, user);
 		else done(err, null)
	})
});

// defines mongoURI and connects to it, depending on connection
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var app = express();

var PORT = process.env.PORT || 3000;

// Set up Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// GET requests
app.get('/account', ensureAuthenticated, index.account);
app.get('/auth/twitter',
	passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
	passport.authenticate('twitter', { failureRedirect: '/', successRedirect:'/account' }));

// app.post('postGiph', index.postGiph);

app.get('/logout', index.logout);
app.get("*", index.home);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});