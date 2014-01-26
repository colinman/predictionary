var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var app = express();
app.use(express.logger());

app.get('/(index.html)?', function(request, response) {    
    response.sendfile('index.html');
});

app.get('/mongotest', function(request, response) {
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
	response.send(docs);
    });
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});