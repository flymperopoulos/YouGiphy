var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
	author: String,
	oauthId : String,
	content: String
});

module.exports = mongoose.model("Post", postSchema);