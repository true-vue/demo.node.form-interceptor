const http = require("http");
const { StringDecoder } = require("string_decoder");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    // handle all post requests
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", (data) => {
      // read incomming data.
      buffer += decoder.write(data);
    });

    req.on("end", () => {
      // when all data received write the response
      buffer += decoder.end();
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Received data: ${buffer}`);
    });
  } else if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello World!`);
  } else {
    res.writeHead(404);
    res.end();
  }
});

// start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Shut down gracefully...
process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
