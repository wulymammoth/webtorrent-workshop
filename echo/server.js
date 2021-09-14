/* You can use the net module to create TCP servers in node. Check the docs for
the createServer function and you'll be on your way. Once you have a socket you
can use the .on('data' function(data) {...}) method to read data from it and
the .write(data) method to write to it. */
const PORT = 8124;

const net = require('net');
const server = net.createServer(socket => {
  console.log('new connection')
  socket.on('data', (data) => socket.write(data));
});
server.listen(PORT);
