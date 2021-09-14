/* For the client you can also use the net module to connect to the server.
Just like with the connection, you can use process.stdin.on('data', ...) to
read from stdin and process.stdout.write(data) to write to stdout. */
const net = require("net"),
  PORT = 8124,
  HOST = 'localhost';
const socket = net.connect(PORT, HOST);

process.stdin.on("data", (data) => socket.write(data));

socket.on('data', (data) => process.stdout.write(data));
