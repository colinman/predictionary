/* File Name: script1.js
 * ---------------------
 * Processes a single file stored in the server
 * Takes the text file then maps an array of every n words to the next word.
 */

var process_file = function(filename, username) {

    var n = 3;

    var fs = require('fs'); //allows access to fs.readFile function
    var path = require('path'); //allows access to path.join function
    var db = require('./datalayer.js'); //allows access to database
    var frequency = new Array();
    var filePath = path.join(__dirname + filename);

    console.log("About to run Script 1 on " + filePath);

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){ //opens file
	if (!err){
	    //process data, removes punctuation, saves words into array
	   // data = data.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()0123456789\"\']/g,"");
	   
//	    data = data.replace(/^[\w-\s]+$/,"");
	    data = data.replace(/\n/g," ");
	    data = data.replace(/\s{2,}/g," ");
	    var array = data.split(" ");

	    var window = new Array();

	    //initializes window to first n words
	    for (var i = 0; i < n; i++) {
		window.push(getWord(array,i)); //same effect as enqueue
	    }

	    console.log("Begin writing to database");

	    //loops over rest of array
	    for(var i = n; i < array.length; i++) {       
		var nextWord = getWord(array,i);
		db.write_word_chunk(window, nextWord, username);
		window.shift(); //same effect as dequeue
		window.push(nextWord);
	    }

	    //sends word frequency to database
	    console.log(frequency);
	    db.write_word_freq(frequency, username);
	    console.log('File Processed');
	} else {
	    console.log(err);
	}
    });

    /*Returns word at array[i] and increments frequency of word */
    function getWord(array, i) {
	var word = array[i].replace(/[\W]+/g, "");
	word = word.replace("\"" ,"");
	word = word.replace("\'","");
	console.log(word);
	trackFrequency(word);
	return word;
    }

    /*Increments frequency of word in array */
    function trackFrequency(word) {
	var pattern = new RegExp("[a-zA-Z0-9]");
	if(pattern.test(word)) {
	if(frequency[word]== undefined || isNaN(frequency[word])) {
	    var i = 1;
	    frequency[word] = i;
	} else {
	    frequency[word] ++;
	}
	}
//	frequency[word] = (frequency[word]==undefined) ? 1 : (frequency[word] + 1);
    }
};

module.exports.process_file = process_file;