/* File Name: script1.js
 * ---------------------
 * Processes a single file stored in the server
 * Takes the text file then maps an array of every n words to the next word.
 */

var n = 3;

var fs = require('fs'); //allows access to fs.readFile function
var path = require('path'); //allows access to path.join function

var frequency = new Array();

var filePath = path.join(__dirname + '/start.html'); //this is place holder for debugging and trial, we will accept filePath from database that calls this function



fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){ //opens file
	if (!err){
	    console.log(data);
	    data = data.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	    data = data.replace(/\n/g," ");
	    data = data.replace(/\s{2,}/g," ");
	    var array = data.split(" "); //turns things separated by spaces as things in an array 
	    var window = new Array();

	    //initializes window to first n words
	    for (var i = 0; i < n; i++) {
		window.push(getWord(array,i));
	    }

	    //loops over rest of array
	    for(var i = n; i < array.length; i++) {       
		var nextWord = getWord(array,i);
		trackMapping(window,nextWord);
		window.shift(); //same effect as dequeue: first element is deleted and everything shifts left
		window.push(nextWord);
	    }
	    sendFrequency(frequency);
	    console.log("Done");
      	}else{
	    console.log(err);
	}
});

/*Returns word at array[i] and increments frequency of word */
function getWord(array, i) {
    var word = array[i];
    trackFrequency(word);
    return word;
}

/*Increments frequency of word in array */
function trackFrequency(word) {
    frequency[word] = isNaN(frequency[word]) ? 1 : frequency[word] + 1;
    var message = "Frequency of " + word + " was changed to " + frequency[word];
    console.log(message); //there is a bug when end of line is read maybe add endline to delimiters
}

/* Debugging placeholder code. This will be implemented by database. Sends database array of n words and the word that follows*/
function trackMapping(window, nextWord){
    var message = window + ".... maps to.... " + nextWord;
    console.log(message);
}

/* Debugging placeholder code. This will be implemented by database. Sends database array of words with their frequency  */
function sendFrequency(frequency) {
    console.log("Frequencies sent.");
    console.log(frequency);
}