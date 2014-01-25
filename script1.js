/* File Name: script1.js
 * ---------------------
 * Processes a single file stored in the server
 * Takes the text file then maps an array of every n words to the next word.
 */

var n = 3;

var fs = require('fs'); //allows access to fs.readFile function
var path = require('path'); //allows access to path.join function

var filePath = path.join(__dirname + '/start.html'); //this is place holder for debugging and trial, we will accept filePath from database that calls this function

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){ //opens file
	if (!err){
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

	    console.log("Done");
      	}else{
	    console.log(err);
	}
});

function getWord(array, i) {
    var word = array[i];
    trackFrequency(word);
    return word;
}

function trackFrequency(word) {
    var message = "Frequency: " + word;
    console.log(message);
}

function trackMapping(window, nextWord){
    var message = window + ".... maps to.... " + nextWord;
    console.log(message);
}