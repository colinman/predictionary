/* Filename: Word mapper
 * -----------------
 * Calls database to get the predicted word from a phrase
 */


/*Gets the last three words from script3 as an array*/
var words = new Array();
var nextword;

for(var i = 0; i<3; i++){
	var word1 = words[0];
	var word2 = words[1];
	var word3 = words[2];
	nextword = next_chunk_word(word1, word2, word3);
	if(nextword != NULL){
		break;
	}
	words[i] = "";
}

/*next word is valid: JSon it to the browser*/

