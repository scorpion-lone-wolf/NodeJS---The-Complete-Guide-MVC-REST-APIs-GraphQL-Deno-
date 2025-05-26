const http = require("http");

const PORT = 3000;

const commonRoute = (res, msg) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello Server</title></head>");
  res.write(`<body>${msg}</body>`);
  res.end("</html>");
};

const server = http.createServer((req, res) => {
  const URL = req.url;
  const METHOD = req.method;

  if (URL === "/" && METHOD === "GET") {
    commonRoute(
      res,
      `<form action='/create-user' method='POST'>
         <input type='text' name='username' />
         <button type='submit'>Send</button>
       </form>`
    );
  } else if (URL === "/users" && METHOD === "GET") {
    commonRoute(
      res,
      "<ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li></ul>"
    );
  } else if (URL === "/create-user" && METHOD === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedBody = new URLSearchParams(body);
      const username = parsedBody.get("username");
      console.log("User submitted:", username);
      res.setHeader("Content-Type", "text/html");
      res.end(`<html><body><h1>${username} has been added</h1></body></html>`);
    });
  } else {
    commonRoute(res, "This is Default Route");
  }
});

server.listen(PORT, () => {
  console.log("Server Started Successfully on port:", PORT);
});
