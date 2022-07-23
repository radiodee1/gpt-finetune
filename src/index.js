
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
  4: "Count? There are "
}

var start_name = "";

if (arg_list.length === 0) {
  start_name = "../png/";
} 
else {
  start_name = arg_list[0].trim()
}

for (var i = 0; i <= 10; i ++) {
  var j = "0000" + i;
  var l = j.length;
  var name = j.slice(l-2);

  const ii00 = `${start_name}dot_${name}_00.png`;
  const ii01 = `${start_name}dot_${name}_01.png`;
  console.log(ii00, ii01);

  get_ascii(ii00, i, 0);
  get_ascii(ii01, i, 1);
}

function get_ascii( filename, index_1, index_2 ) {
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
  console.log(text + "\n");
  console.log(text_out[i] + index_1);
  fs.appendFileSync("../../corpus.00.txt", text + "\n" + text_out[i] + index_1 + "\n\n", (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("complete");
  });

  var jtext = `{"text":"${text}\n${text_out[i]}${index_1}\n\n", "meta":{"pile_set_name":"Count"}}`;
  jtext = jtext.replace("/\n/g", "\u000D");
  jtext = JSON.stringify(jtext);

  if (jtext.startsWith("\"")) {
    jtext = jtext.slice(1);
  }
  if (jtext.endsWith("\"")) {
    jtext = jtext.slice(0, jtext.length - 1);
  }
  
  jtext = jtext.replace(`/\\\"/g`,`"`);

  console.log(jtext);
  fs.appendFileSync("../../corpus.00.jsonl", jtext + "\n", (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("complete");
  });




}
