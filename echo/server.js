/* You can use the net module to create TCP servers in node. Check the docs for
the createServer function and you'll be on your way. Once you have a socket you
can use the .on('data' function(data) {...}) method to read data from it and
the .write(data) method to write to it. */
const net = require("net");
const PORT = 8124;
const server = net.createServer((c) => {
  console.log("[server] client connected\n");
  c.on("end", () => console.log("[server] client disconnected\n"));
  c.pipe(c);
});
server.on("error", (err) => {
  throw err;
});
server.listen(PORT, () => {
  console.log(`[server] TCP server listening on port ${PORT}\n`);
});
server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    // echo the request data sent to the server
    socket.write(chunk.toString());
  });
  socket.on("end", () => console.log("[server] client connection closed\n"));
});
