
//import art from "ascii-art"

const fs = require("fs");

var asciify = require("asciify-image");

const arg = process.argv;

const arg_list = arg.slice(2);

console.log(arg_list);

const text_out = {
  0: "How many dots are there? There are ",
  1: "Count the dots. I see ",
  2: "Human: How many dots are there?\nJane: there are ",
  3: "Tell me how many items are in the picture. There are ",
  4: `Human: Hi?
Jane: Hello there.

Human: Do you like candy?
Jane: Yes I like candy.

Human: What is your favorite color?
Jane: My favorite color is blue.

Human: Count? 
Jane: There are `
}

var start_name = "";

if (arg_list.length === 0) {
  start_name = "../png/";
} 
else {
  start_name = arg_list[0].trim()
}

fs.writeFileSync('./corpus.00.jsonl', '', function(){console.log('done')});
fs.writeFileSync('./corpus.00.txt', '', function(){console.log('done')});

for (var i = 0; i <= 10; i ++) {
  var j = "0000" + i;
  var l = j.length;
  var name = j.slice(l-2);

  const ii00 = `${start_name}dot_${name}_00.png`;
  const ii01 = `${start_name}dot_${name}_01.png`;
  console.log(ii00, ii01);

  get_ascii(ii00, i);
  get_ascii(ii01, i);
}

function get_ascii( filename, index_1 ) {
  asciify(
    filename,
    {
      fit: "box",
      width: 32,
      height: 24,
      color: false
    },
    (err, converted) => {
      //console.log(err || converted);
      if (err) {
        console.log(err);
      }

      //write_corpus(converted, index_1, index_2);
      for(var i = 0; i < 5; i ++) {
        write_corpus(converted, index_1, i);

      }
      //console.log(converted);
      //console.log("");
    }
  );
}

function write_corpus(text, index_1, i) {
  //console.log(text + "\n");
  //console.log(text_out[i] + index_1);
  
  const label = "counting";
  
  fs.appendFileSync("./corpus.00.txt", label + "\n" +  text + "\n" + text_out[i] + index_1 + "\n<|endoftext|>\n", (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("complete");
  });

  var jtext = {"text":`${label}\n${text}\n${text_out[i]}${index_1}\n`, "meta":{"pile_set_name":"Count"}};
  //jtext = jtext.replace("/\n/g", "\u000D");
  jtext = JSON.stringify(jtext);

  //console.log(jtext);
  fs.appendFileSync("./corpus.00.jsonl", jtext + "\n", (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("complete");
  });

}
