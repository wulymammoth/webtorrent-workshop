/* 1. You can use the net module to create TCP servers in node. Check the docs for
 * the createServer function and you'll be on your way. Once you have a socket you
 * can use the .on('data' function(data) {...}) method to read data from it and
 * the .write(data) method to write to it.
 */

/* 2. maintain multiple connections to the server
 *   - also track disconnections
 *
 *   Luckily there is a module on npm called stream-set. It keeps track of a list of streams and remove streams from the list as they become closed. TCP sockets in node, are also streams, so you can use this module to keep track of the connections to your server.

 * Now, all you need to do is write the message received from one client to the remainder of clients.
 */
const PORT          = 10000;
const net           = require('net');
const jsonStream    = require('duplex-json-stream');
const logger        = console;
const streamSet     = require('stream-set');
const activeClients = streamSet();

// data is an object (not a buffer because of jsonStream)
const broadcast = (data) => activeClients.forEach(client => client.write(data))

// turn socket into a JSON client w/ some logging
const connectionHandler = (socket) => {
  logger.log('new connection');

  // Turn a transport stream into an duplex stream that parses from /
  // serializes to json
  client =
    jsonStream(socket)
    .on('data', broadcast)
    .on('close', () => logger.log(`[socket:close] clients: ${activeClients.size}`));

  activeClients.add(client);
}

net.createServer(connectionHandler).listen(PORT)
