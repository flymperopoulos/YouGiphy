// Requires mongoose
var mongoose = require('mongoose');

// Creates new Schema out of mongoose
var personSchema = mongoose.Schema({
	oauthID : Number,
	name : String,
	created: Date,
	displayName:String
});

// Definition of the model in the models file
var Human = mongoose.model('Human', personSchema);

// Export the model
module.exports = Human;