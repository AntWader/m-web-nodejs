var http = require('http');
var querystring = require('querystring');

const port = 8282;

var server = http.createServer().listen(port);

server.on('connection', function(sock) {
  console.log('Client connected from ' + sock.remoteAddress);
  // Client address at time of connection ----^
});

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
        console.log(`${new Date().toUTCString()}  >> data received : ${data} `);
    });

    req.on('end', function () {
        console.log(`${new Date().toUTCString()}  send response to the client : ${body}`);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(body);
        console.log(`${new Date().toUTCString()} Connection closed`);
    });
});

console.log(`Listening on port ${port}`);