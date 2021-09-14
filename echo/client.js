/* For the client you can also use the net module to connect to the server.
Just like with the connection, you can use process.stdin.on('data', ...) to
read from stdin and process.stdout.write(data) to write to stdout. */
const PORT       = 10000
const HOST       = 'localhost'
const net        = require('net')
const jsonStream = require('duplex-json-stream')
const handle     = process.argv[2]

class Message {
  constructor(handle, content) {
    this.handle = handle
    this.content = content.toString()
  }

  serialize() {
    return { handle: this.handle, message: this.content }
  }
}

const receive = (data) => process.stdout.write(`[${data.handle}] ${data.message}`)
const client  = jsonStream(net.connect(PORT, HOST)).on('data', receive)
process.stdin.on("data", (content) => client.write(new Message(handle, content).serialize()))
