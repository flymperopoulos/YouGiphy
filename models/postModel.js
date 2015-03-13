var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
	author: String,
	content: String,
	giphURL: String
});

module.exports = mongoose.model("Post", postSchema);