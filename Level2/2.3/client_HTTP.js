var http = require('http');
var querystring = require('querystring');

var postData = 'hello HTTP';

const port = 8282;

var options = {
    hostname: 'localhost',
    port: port,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};

//send time
let sedT = new Date();

var req = http.request(options, function (res) {
    //console.log('STATUS:', res.statusCode);
    //console.log('HEADERS:', JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log(`Client received from server : ${chunk}`);
        console.log(postData.localeCompare(chunk) >= 0);
    });

    res.on('end', function () {
        console.log((new Date(new Date() - sedT).getTime() / 1000) + ' sec.');
        console.log('No more data in response.');
    });
});

req.on('error', function (e) {
    console.log('Problem with request:', e.message);
});

console.log(`Client send to server : ${postData}`);
req.write(postData);
req.end();