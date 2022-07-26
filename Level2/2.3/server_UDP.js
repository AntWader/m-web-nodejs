const dgram = require('dgram');
const server = dgram.createSocket('udp4');
 
const host = '0.0.0.0';
const port = 8383;
 
server.on('error', (err) => {
  console.log(err.stack);
  server.close();
});
 
server.on('message', (msg, rinfo) => {
  console.log(`${new Date().toUTCString()}  server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
 
  const reply = Buffer.from(msg);
  server.send(reply, 0, reply.length, rinfo.port, rinfo.address, (err, bytes) => {
    if (err){
      console.log(err.stack);
    }
  });
  console.log(`${new Date().toUTCString()}  server sent: ${msg} to ${rinfo.address}:${rinfo.port}`);
  console.error(`${new Date().toUTCString()}  ${rinfo.address}:${rinfo.port} Connection closed`);
});
 
server.on('listening', () => {
  const address = server.address();
  console.log(`Server started on: ${address.address}:${address.port}`);
});
 
server.bind(port, host);