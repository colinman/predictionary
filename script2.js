/*File Name: script2
 * --------------------
 * Autocomplete!
*/

var db = require("./datalayer.js");

var prefix = "col"; //get prefix, username, and map_override
var username = "Colin";
var mapped = new Array(); //array containing all prefixes after this particular three-word clause

var dictionary_rank = new Array();; //these are reached with function calls to the database
var my_freq;

var prediction = null;

function tiebreaker (my_freq, prediction, name){
    return my_freq[prediction] < my_freq[name];
}

function callback_freq(words){
    my_freq = words;
    var min_rank = 15; //arbitrarily large
    for(var i = 0; i<dictionary_rank.length; i++){
	var name = dictionary_rank[i];
	var my_rank = Math.round(dictionary_rank[name]/19000); //squeezes it down to 0-
	if(min_rank > my_rank){
	    min_rank = my_rank;
	    prediction = name;
	}
	else if(min_rank == my_rank){
	    if(tiebreaker(my_freq, prediction, name)){
		max_rank = my_rank;
		prediction = name;
	    }
	}
    }
    console.log(prediction);
}


function reformat(words){ //reformats the array to: word mapping to rank
    var arr = new Array();
    for(var i = 0; i<words.length; i++){   
	var obj = words[i]; //for each obj in words
	var name = obj["word"]; 
	arr[i] = name;
	arr[name] = obj["rank"];
    }
    return arr;
}

function callback_fdict(words){ //words is an array of top ten words in the database
    dictionary_rank = reformat(words);
    db.ufreq_topten_prefix(prefix, username, callback_freq);
}


function map_contains_prefix(){
    var max_freq = -1;
    for(var i = 0; i<mapped.length; i++){
	/*If mapped[i] contains the prefix, and has the highest frequency */
	if((mapped[i].substring(0, prefix.length) == prefix) && (db.get_fdict_freq(mapped[i])> max_freq)){
	    max_freq = db.get_fdict_freq(mapped[i]);
	    prediction = mapped[i];
	}
    }
    return prediction;
}

var my_map_name = map_contains_prefix();
if(my_map_name != null){
    console.log(prediction);
} else{
    db.fdict_topten_prefix(prefix, callback_fdict); //sorted in rank order
}



