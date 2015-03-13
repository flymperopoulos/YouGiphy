var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('./oauth.js');
var path = require('path');
var Human = require(path.join(__dirname,'./models/personModel'));

// config
module.exports = passport.use(new TwitterStrategy({
	consumerKey: config.twitter.consumerKey,
	consumerSecret: config.twitter.consumerSecret,
	callbackURL: config.twitter.callbackURL
},
function(accessToken, refreshToken, profile, done) {
	Human.findOne({ oauthID: profile.id }, function(err, user) {
		if(err) { console.log(err); }
		if (!err && user != null) {
			done(null, user);
		} else {

			var displayWithUnder = profile.displayName.replace(/ /g,"_");

			var user = new Human({
				oauthID: profile.id,
				name: profile.displayName,
				created: Date.now(),
				displayName: displayWithUnder
			});

			user.save(function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("saving user ...");
					done(null, user);
				};
			});
		};
	});
}
));