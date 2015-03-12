var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var Human = require(path.join(__dirname,'../models/personModel'));
var Post = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html');
};

routes.account = function(req, res){

	// looks by id in the passport session for the user that got authenticated 
	Human.findById(req.session.passport.user, function(err, user) {
 		if(err) {
 			errorHandler(err, req, res);
 		} else {

 			// looks for all twottes and sorts by reverse time
 			Post.find({}, null, {sort:{timestamp:-1}}, function (err, giphPostsNew){
 				if (err) {
 					errorHandler(err, req, res);
 				} 
 				Human.find({}, function(err, peopleNew){
 					if (err){
 						errorHandler(err, req, res);
 					} 				

 					// replacing ' ' with '_' for better class reference of unique authenticated person name
	 				var displayName = user.name.replace(/ /g,"_");

	 				// data that will render account.handlebars
	 				var CompletePageData = {
	 					people : peopleNew,
	 					posts : giphPostsNew,
	 					name:user.name,
	 					displayName:displayName
	 				}

	 				res.status(200).json(CompletePageData);

   				})
   			})
 		}
	});
}

// logout method
routes.logout = function (req, res){
	req.logout();
	res.redirect('/');
}

module.exports = routes;
