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
const PORT = 10000;
const net = require('net'), streamSet = require('stream-set'), logger = console;
const activeSockets = streamSet();

const broadcast = (data) => activeSockets.forEach(socket => socket.write(data));

const server =
  net.createServer(socket => {
    logger.log('new connection')
    activeSockets.add(socket);
    socket
      .on('data', broadcast)
      .on('close', () => logger.log(`[socket:close] sockets: ${activeSockets.size}`));
  }).listen(PORT, () => {
    const socket = net.connect(PORT);
    socket.on('connect', () => socket.destroy());
  });
