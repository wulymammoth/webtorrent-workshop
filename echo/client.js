/* For the client you can also use the net module to connect to the server.
Just like with the connection, you can use process.stdin.on('data', ...) to
read from stdin and process.stdout.write(data) to write to stdout. */
const PORT       = 10000
const HOST       = 'localhost'
const net        = require('net')
const jsonStream = require('duplex-json-stream')
const user       = process.argv[2];
const client     = jsonStream(net.connect(PORT, HOST)).on('data', console.log)

class Message {
  constructor(user, content) {
    this.user = user
    this.content = content.toString()
  }

  serialize() {
    return { user: this.user, message: this.content }
  }
}

process.stdin.on("data", (content) => client.write(new Message(user, content).serialize()))
