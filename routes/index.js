var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var Human = require(path.join(__dirname,'../models/personModel'));
var Post = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html');
};

routes.createPost = function (req, res){

	// grabs data from request json body
	var postContent = req.body.content;
	var giphContent = req.body.giphURL;

	// creates new wikiArticle
	var newPost = new Post({
		authorName : req.body.author,
		authorId : req.session.passport.user,
		content : postContent,
		giphURL : giphContent
	});

	console.log('GIVE ME A POST ', newPost);

	// saves wikiArticle and sends responce json
	newPost.save(function (err, post){
		if (err) {
			errorHandler(err, req, res);
		} else {
			// sends article as json
			res.json(post);
		}
	})
}

routes.account = function(req, res){
	console.log('GIVE ME SESSION ', req.session);
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
