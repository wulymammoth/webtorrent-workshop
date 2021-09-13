/* For the client you can also use the net module to connect to the server.
Just like with the connection, you can use process.stdin.on('data', ...) to
read from stdin and process.stdout.write(data) to write to stdout. */
const net = require("net");
const PORT = 8124;
const socket = net.connect(PORT, "localhost");
process.stdin.on("data", (data) => process.stdout.write(`[client] server response: ${data}\n`));
