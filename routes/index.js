var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var WikiArticle = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

// the response from this route will be passed
// as an argument to a search route for Giphy
routes.parseForHash = function(req, res){
	// searchTerm will eventually be sent via req
	var searchTerm = "i#kjhf kdj #kfj ld";
	// creates an array of strings
	var splitSpaces = searchTerm.split(' ');
	// goes through elements of the array
	for (i in splitSpaces){
		var elt = splitSpaces[i];
		// checks if elt is a tag
		// '#' at any index other than 0 is not a tag
		if (elt.indexOf('#') == 0){
			console.log("good news");
			res.send(elt);
		}
		else {
			console.log("bad news");
		};
	};
};

// for the moment, this does absolutely nothing
// just a skeleton for later dev in a separate branch
routes.searchGiphy = function(req, res){
	// pulled directly from Giphy APi
	// modified to use passed-in search term
	// should theoreticaally work, untested
	var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ req.data +"&api_key=dc6zaTOxFJmzC&limit=5");
	xhr.done(function(data) { console.log("success got data", data); });
};

module.exports = routes;
