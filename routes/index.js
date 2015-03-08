var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var WikiArticle = require(path.join(__dirname,'../models/postModel'));

var routes = {};

routes.home = function(req, res){
	res.sendFile('./public/main.html')
};

module.exports = routes;