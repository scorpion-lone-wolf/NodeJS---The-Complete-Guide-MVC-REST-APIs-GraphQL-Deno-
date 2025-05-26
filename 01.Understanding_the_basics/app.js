const http = require("http");
const {
  handleHomeRoute,
  handleMessageRoute,
  handleDefaultRoute,
} = require("./routes");

// Constants
const PORT = 3000;

// Server Request Handler
const requestHandler = (req, res) => {
  const { url, method, headers } = req;

  if (url === "/" && method === "GET") return handleHomeRoute(res);

  if (url === "/message" && method === "POST")
    return handleMessageRoute(req, res);

  return handleDefaultRoute(res);
};

// Create and Start Server
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
