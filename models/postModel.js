var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
	authorId: String,
	authorName : String,
	content: String,
	giphURL: String
});

module.exports = mongoose.model("Post", postSchema);