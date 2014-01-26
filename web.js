var express = require('express');
var routes = require('./routes');
var http = require('http');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var app = express();
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
    });

app.get('/', routes.index);

/*
app.get('/(index.html)?', function(request, response) {    
    response.sendfile('editor.html');
}); */

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});