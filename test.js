var dl = require("./datalayer.js");
var script1 = require("./script1.js");
var map = require("./mapper.js");

//var array = ["Beauty", "and", "the"];

script1.process_file("/English1.txt", "colinman@stanford.edu");
script1.process_file("/English2.txt", "colinman@stanford.edu");
script1.process_file("/English3.txt", "colinman@stanford.edu");
script1.process_file("/English4.txt", "colinman@stanford.edu");

//var array = {"words":2, "asdf":3};

//dl.write_word_freq(array, "colinman@stanford.edu");


function print(text) {
    console.log(text);
}

//map.mapper(array, "colinman@stanford.edu", print);

/*
var array = ["brie", "the", "argh"];

//dl.write_word_chunk(array, "anotherword", "colinman@stanford.edu");
//dl.write_word_freq(array, "colinman@stanford.edu");
//dl.fdict_topten_prefix("bri", print);
//dl.ufreq_topten_prefix("bler", "colinman@stanford.edu", print);
//dl.get_fdict_freq("malina", print);
dl.find_word_chunk("brie", "the", "argh", "colinman@stanford.edu", print);*/