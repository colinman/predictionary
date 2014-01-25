var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/predictionary');
var collection = db.get('words');

function fdict_topten_prefix(prefix, callback) {
    var pattern = new RegExp('^'+ prefix);
    collection.find({word:pattern}, {sort:{rank:1, _id:0}, limit: 10}, function(e, docs) {
	callback(docs);
    });
}

function print(words) {
    console.log(words);
}

fdict_topten_prefix("ken", print);

// collection.find({},{},function(e,docs){
//     console.log(docs);
// });

// var fs = require('fs');
// var path = require('path');

// var filePath = path.join(__dirname, 'words');
// var arr = new Array();

// fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
//     if (!err){
// 	arr = JSON.parse(data);
// 	for(var w in arr) {
// 	    var word = {"word":w, "rank":arr[w]};
// 	    console.log(word);
// 	    collection.insert(word, function(e) {
// 		if(err) console.log(err);
// 	    });
// 	}
//     }
//     else console.log(err);
// });