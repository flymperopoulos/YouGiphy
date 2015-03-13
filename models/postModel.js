var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
	authorId: String,
	authorName : String,
	content: String,
	giphURL: String, 
	date : Date
});

module.exports = mongoose.model("Post", postSchema);