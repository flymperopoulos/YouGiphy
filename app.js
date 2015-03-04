var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var index = require('./routes/index');
var multer  = require('multer');

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ dest: './uploads/'}))

app.get("*", index.home);

mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});