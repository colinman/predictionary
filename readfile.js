var fs = require('fs'); 
var path = require('path');

var sample ='/start.html'; //fix this. when in actual code you will be passed the file so filePath is req.files.sample.path
var filePath = path.join(__dirname + sample);
//var filePath = req.files.sample.path


fs.readFile(filePath, function (err, data) {
	console.log(filePath);
	console.log(data);
	var newPath = path.join(__dirname +  "/uploads" + sample); //or is it req.files.sample.name
	fs.writeFile(newPath, data, function(err){
      	});
	console.log("done");
});