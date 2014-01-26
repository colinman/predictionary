var fdict_topten_prefix = function(prefix, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('words');

    var pattern = new RegExp('^'+ prefix);
    collection.find({word:pattern}, {sort:{rank:1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
};

var ufreq_topten_prefix = function(prefix, user, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_wfreq');

    var pattern = new RegExp('^'+ prefix);
    collection.find({word:pattern, username:user}, {sort:{freq:-1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
};

var get_fdict_freq = function(word, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('words');
    var pattern = new RegExp('^'+ word + '$');
    collection.find({word:pattern}, {sort:{rank:1}, limit: 10}, function(e, docs) {
	callback(docs);
    });
};

var write_word_freq = function(frequencies, user) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_wfreq');
    
    for(var w in frequencies) {
	collection.update({word:w, username:user}, {$inc:{freq:frequencies[w]}}, {upsert:true});
    }
};

var write_word_chunk = function(chunk, next_word, user) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_chunks');
    
    for(var i in chunk) {
	collection.update({word1:chunk[0], word2:chunk[1], word3:chunk[2], username:user}, {$addToSet:{word:next_word}}, {upsert:true});
    }
};

var find_word_chunk = function(w1, w2, w3, user, callback) {
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/predictionary');
    var collection = db.get('user_chunks');
    
    if(w1 == null && w2 == null) collection.find({word3:w3, username:user}, {}, function(e, docs) { callback(docs); });
    else if(w1 == null) collection.find({word2:w2, word3:w3, username:user}, {}, function(e, docs) { callback(docs); });
    else collection.find({word1:w1, word2:w2, word3:w3, username:user}, {}, function(e, docs) { callback(docs); });

};

module.exports.find_word_chunk = find_word_chunk;
module.exports.fdict_topten_prefix = fdict_topten_prefix;
module.exports.ufreq_topten_prefix = ufreq_topten_prefix;
module.exports.get_fdict_freq = get_fdict_freq;
module.exports.write_word_freq = write_word_freq;
module.exports.write_word_chunk = write_word_chunk;