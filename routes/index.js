var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var WikiArticle = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.parseForHash = function(req, res){
	var searchTerm = "ikjhf kdj #kfj ld";
	var splitSpaces = searchTerm.split(' ');
	console.log(splitSpaces);
	for (i in splitSpaces){
		var elt = splitSpaces[i];
		if (elt.indexOf('#') !== -1){
			console.log("good news");
			res.send(elt);
		}
		else {
			console.log("bad news");
		};
	};
};

module.exports = routes;
