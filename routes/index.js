var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var Person = require(path.join(__dirname,'../models/personModel'));
var Post = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.account = function(req, res){

	// looks by id in the passport session for the user that got authenticated 
	Person.findById(req.session.passport.user, function(err, user) {
 		if(err) {
 			errorHandler(err, req, res);
 		} else {

 			// looks for all twottes and sorts by reverse time
 			Post.find({}, null, {sort:{timestamp:-1}}, function (err, giphPostsNew){
 				if (err) {
 					errorHandler(err, req, res);
 				} 
 				Person.find({}, function(err, peopleNew){
 					if (err){
 						errorHandler(err, req, res);
 					} 				

 					// replacing ' ' with '_' for better class reference of unique authenticated person name
	 				var displayName = user.name.replace(/ /g,"_");

	 				// data that will render account.handlebars
	 				var CompletePageData = {
	 					people : peopleNew,
	 					twottes : giphPostsNew,
	 					name:user.name,
	 					displayName:displayName
	 				}

   				})
   			})
 		}
	});
}

// routes.postGiph = function (req, res){

// 	// looks database based on ID
// 	Person.findById(req.session.passport.user, function(err, user) {
//  		if(err) {
//   			console.log(err);
//  		} else {

//  			// declares the passport object and gets name and message from request
//  			var passportObj = req.session.passport;
// 			var passportAuthor = user.name;
// 			var message = req.body.message;
// 			var displayTime = getTimeStamp();

// 			var post = new Post({
// 				author:passportAuthor, 
// 				message:message,
// 				timestamp: displayTime,
// 				displayName : user.name.replace(/ /g,"_")
// 			});

// 			post.save(function (err, giphPost){
// 				if (err) {
// 					errorHandler(err, req, res);
// 				} else {

// 					// sends twotte as json
// 					res.json(giphPost);
// 				}
// 			})

//  		}
// 	});
// }

// logout method
routes.logout = function (req, res){
	req.logout();
	res.redirect('/');
}

module.exports = routes;
