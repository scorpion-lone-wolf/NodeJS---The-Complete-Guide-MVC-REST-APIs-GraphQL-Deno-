const fs = require("fs");

// Helper: Send HTML Response
const sendHtmlResponse = (res, htmlContent) => {
  res.setHeader("Content-Type", "text/html");
  res.write(htmlContent);
  res.end();
};

// Route: Home Page (GET /)
const handleHomeRoute = (res) => {
  const html = `
    <html>
      <head><title>Enter Message</title></head>
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `;
  sendHtmlResponse(res, html);
};

// Route: Message Submission (POST /message)
const handleMessageRoute = (req, res) => {
  const bodyChunks = [];

  req.on("data", (chunk) => {
    bodyChunks.push(chunk);
  });

  req.on("end", () => {
    const parsedBody = Buffer.concat(bodyChunks).toString();
    const message = parsedBody.split("=")[1];

    // Save message to file
    fs.writeFileSync("message.txt", message);

    // Redirect to home
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  });
};

// Route: Default/Fallback
const handleDefaultRoute = (res) => {
  const html = `
    <html>
      <head><title>My First Page</title></head>
      <body><h1>Hello from my Node.js Server! (Default route)</h1></body>
    </html>
  `;
  sendHtmlResponse(res, html);
};

module.exports = {
  handleHomeRoute,
  handleMessageRoute,
  handleDefaultRoute,
};
