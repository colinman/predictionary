var express = require('express');
var app = express();
var map = require('./mapper.js');
var wordcomplete = require('./script2.js');

app.configure(function () {
	app.use(
		"/", //the URL throught which you want to access to you static content
		express.static(__dirname) //where your static content is located in your filesystem
		);
    });

app.use("/mapper", function(req, res) {
   console.log(req.query);
   var array = [req.query.word1, req.query.word2, req.query.word3];
   var word = map.mapper(array, req.query.user, function(suggestion) {
	   res.send(suggestion);
       });
});

app.use("/wordcomplete", function(req, res) {
   console.log(req.query);
   var suggestion = wordcomplete.autocomplete(req.query.mapped, req.query.prefix, req.query.username, function(suggestion) {
   res.send(suggestion);
       });
});

app.listen(3000); //the port you want to use