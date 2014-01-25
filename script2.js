 /*FIle Name: script2
 * --------------------
 * Autocorrect!
*/

/*Shit Colin needs to get me */
var dictionary_freq = new Array(); //all prefixes - word -> rank
dictionary_freq[0] = "one";
dictionary_freq[1] = "onix";
dictionary_freq[2] = "omg";
dictionary_freq[3] = "oooooooo";
dictionary_freq["one"] = 3;
dictionary_freq["onix"] = 1;
dictionary_freq["omg"] = 15;
dictionary_freq["oooooooo"] = 4;

var my_freq = new Array(); //word -> rank
my_freq[0] = "one";
my_freq[1] = "onix";
my_freq[2] = "ohgosh";
my_freq[3] = "oooooooo";
my_freq["one"] = 3;
my_freq["onix"] = 4;
my_freq["ohgosh"] = 5;
my_freq["oooooooo"] = 10;
var my_num = 1000;

var prediction = "temporary";
var max_rank = 300000;
for(var i = 0; i<dictionary_freq.length; i++){
	var word = dictionary_freq[i];
	var combined_rank = dictionary_freq[word]; //adds the frequency from the dictionary to the combined rank
	var found = false;
	for(var j = 0; j< my_freq.length; j++){
		if(word === my_freq[j]){
			found = true;
			combined_rank += my_freq[word] * (190000)/(my_num);
			break;
		}
	}
	if(!found)
		combined_rank +=  median(my_freq); //adds median if can't be found in my_freq
	}
	if(max_rank > combined_rank){
		max_rank = combined_rank;
		prediction = word;
	}
}
console.log(prediction);



function median(my_freq){
	var word = my_freq[my_num/2];
	return my_freq[word];
}
