// Basic server Template starts
const http = require("http"); //Server
const server = http.createServer();
const fs = require("fs"); //importing File System
const formidable = require("formidable"); //To upload file

// server.on("request", (req, res) => {
//   console.log(req.method, " ", req.url);
//   const DataString = "This is file system class";
//   if (req.method === "GET" && req.url === "/") {
//     return res.end("This is your home app");
//   }

//   //   create and write in a file
//   else if (req.method === "GET" && req.url == "/append") {
//     fs.appendFile("upload/demo1.txt", DataString, (err) => {
//       if (err) throw err;

//       console.log("Appended");
//       return res.end("Text Appended");
//     });
//   } else if (req.method === "GET" && req.url == "/writefile") {
//     fs.writeFile("demo2.txt", DataString, (err) => {
//       console.log("write file");
//       return res.end("Write file");
//     });
//   }
//   // whole data in single time not scalable
//   else if (req.method === "GET" && req.url == "/readfile") {
//     fs.readFile("test.html", (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       res.write(data);
//       return res.end();
//     });
//   } else if (req.method === "GET" && req.url == "/deletefile") {
//     fs.unlink("demo.txt", (err, data) => {
//       if (err) throw err;
//       console.log("Deleted");
//       return res.end("File deleted successfully");
//     });
//   } else if (req.method === "GET" && req.url == "/renamefile") {
//     fs.rename("demo2.txt", "newDemo.txt", (err) => {
//       if (err) throw err;
//       console.log("Rename");
//       return res.end("File renamed successfully");
//     });
//   }

//   //creating a stream to read a file
//   else if (req.method === "GET" && req.url == "/streamfile") {
//     const rStream = fs.createReadStream("demo2.txt");

//     rStream.on("data", (char) => {
//       console.log(char, "");
//       res.write(char);
//     });

//     rStream.on("end", () => {
//       return res.end();
//     });
//   }
// });

// upload a file
server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/fileupload") {
    // form submission
    let form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
      const oldPath = files.fileToUpload.filepath;
      const newPath =
        __dirname + "/upload/" + files.fileToUpload.originalFilename;

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        return res.end("file uploaded successfully");
      });
    });
  } else {
    // return html form
    fs.readFile("form.html", (err, data) => {
      if (err) throw err;

      res.write(data);
      return res.end();
    });
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
