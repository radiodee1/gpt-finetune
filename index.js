
//import art from "ascii-art"

var asciify = require("asciify-image")
  asciify(
    "/tmp/gpt-etc.png",
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
 
      console.log(err,converted);
      console.log(converted.normalize('NFKD'));
     //out = converted;
      //mainWindow.webContents.send("asciiload", out);
    }
  );

