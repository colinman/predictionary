var fdict_topten_prefix = function(prefix, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('words');

    var pattern = new RegExp('^'+ prefix);
    collection.find({word:pattern}, {sort:{rank:1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
}

var ufreq_topten_prefix = function(prefix, user, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_wfreq');

    var pattern = new RegExp('^'+ prefix);
    collection.find({word:pattern, username:user}, {sort:{freq:-1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
}

var get_fdict_freq = function(word, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('words');
    var pattern = new RegExp('^'+ word + '$');
    collection.find({word:pattern}, {sort:{rank:1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
}

var write_word_freq = function(frequencies, user) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_wfreq');
    
    for(var w in frequencies) {
	collection.update({word:w, username:user}, {$inc:{freq:frequencies[w]}}, {upsert:true, multi:true});
    }
}

module.exports.fdict_topten_prefix = fdict_topten_prefix;
module.exports.ufreq_topten_prefix = ufreq_topten_prefix;
module.exports.get_fdict_freq = get_fdict_freq;
module.exports.write_word_freq = write_word_freq;


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