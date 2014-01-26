/* Filename: Word mapper
 * -----------------
 * Calls database to get the predicted word from a phrase
 */


/*Gets the last three words from script3 as an array*/
var words = new Array();
var username;

var prediction=NULL;
function callback(words){
	var max_freq = 0;
	if(words.length > 0){
		for(var i = 0; i<words.length; i++){
			var freq = get_fdict_freq(words[i]);
			if(freq > max_freq){
				max_freq = freq;
				prediction = words[i];
			}
		}
	}
}

for(var i = 0; i<3; i++){
	var word1 = words[0];
	var word2 = words[1];
	var word3 = words[2];
	next_chunk_word(word1, word2, word3, username, callback);
	words[i] = NULL;
}

if(prediction != NULL){ 
/*prediction is valid: JSon it to the browser*/
}
else{
	return NULL;
}

