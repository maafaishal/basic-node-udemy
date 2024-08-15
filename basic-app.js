const http = require("node:http");
const fs = require("node:fs");
const qs = require("node:querystring");

const PATHS = {
  "/": (req, res) => {
    // res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>");
    res.write("<head><title>My Title</title></head>");
    res.write(
      "<body><form method='post' action='/message'><input type='text' name='message'><input type='text' name='message1'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    res.end();
  },
  "/message": (req, res) => {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const parsedBody = qs.parse(body);
        console.log("🚀 ~ req.on ~ parsedBody:", parsedBody);
        fs.writeFile("test.txt", JSON.stringify(parsedBody), (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
  },
};

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader("Content-Type", "text/html");

  if (url in PATHS) {
    PATHS[url](req, res);
  } else {
    res.end("Error");
  }
});

server.listen(8000);
