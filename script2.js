/*File Name: script2
 * --------------------
 * Autocorrect!
*/

var prefix; //get prefix, username, and map_override
var username;
var mapped; //array containing all prefixes after this particular three-word clause

var dictionary_rank; //these are reached with function calls to the database
var my_freq;

var prediction = NULL;

function tiebreaker (my_freq, prediction, name){
	if(my_freq[prediction] < my_freq[name]){
		return true;
	}
	return false;
}

function callback_freq(words){
	my_freq = words;
	var min_rank = 15; //arbitrarily large
	for(var i = 0; i<dictionary_rank.length; i++){
		var name = dictionary_rank[i];
		var my_rank = dictionary_rank[name]/19000; //squeezes it down to 0-9
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
}


function reformat(words){ //reformats the array to: word mapping to rank
	var arr = new Array();
	for(var i = 0; i<words.length; i++){
		var obj = words[i]; //for each obj in words
		var name = obj["name"]; 
		arr[i] = name;
		arr[name] = obj["rank"];
	}
	return dictionary_rank;
}

function callback_fdict(words){ //words is an array of top ten words in the database
	dictionary_rank = reformat(words);
	ufreq_top_ten(prefix, username, callback_freq);
}


function map_contains_prefix(){
	var max_freq = -1;
	for(var i = 0; i<mapped.length; i++){
		/*If mapped[i] contains the prefix, and has the highest frequency */
		if((mapped[i].substring(0, prefix.length) == prefix) && (get_fdict_freq(mapped[i])> max_freq)){
			max_freq = get_fdict_freq(mapped[i]);
			prediction = mapped[i];
		}
	}
	return prediction;
}

var my_map_name = map_contains_prefix();
if(my_map_name != NULL){
	console.log(prediction);
} else{
	fdict_topten_prefix(prefix, callback_fdict); //sorted in rank order
	console.log(prediction);
}






/*dictionary_rank[0] = "one";
dictionary_rank[1] = "onix";
dictionary_rank[2] = "omg";
dictionary_rank[3] = "oooooooo";
dictionary_rank["one"] = 3;
dictionary_rank["onix"] = 1;
dictionary_rank["omg"] = 15;
dictionary_rank["oooooooo"] = 4;*/


/*my_freq[0] = "one";
my_rank[1] = "onix";
my_rank[2] = "ohgosh";
my_rank[3] = "oooooooo";
my_rank["one"] = 3;
my_rank["onix"] = 4;
my_rank["ohgosh"] = 5;
my_rank["oooooooo"] = 10;*/

