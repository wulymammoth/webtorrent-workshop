/* For the client you can also use the net module to connect to the server.
Just like with the connection, you can use process.stdin.on('data', ...) to
read from stdin and process.stdout.write(data) to write to stdout. */
const PORT   = 8124;
const HOST   = 'localhost';
const net    = require("net");
const socket = net.connect(10000, HOST).on('data', (data) => process.stdout.write(data));

process.stdin.on("data", (data) => socket.write(data));
