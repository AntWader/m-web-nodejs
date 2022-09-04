
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (; ;) {
    try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10)
        break;
      was10++;
    } else
      was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  protocolVer = 'HTTP/1.1'
  console.log(protocolVer + ' ' + statusCode + ' ' + statusMessage + '\n' +
    headers.join('\n') + '\n\n' + body);
}

function processHttpRequest($method, $uri, $headers, $body) {

  if ($method == 'GET' && $uri.startsWith('/sum?nums')) {
    answCode = 200
    answMessage = 'OK'
    answBody = $uri
      .replace(/[^0-9\,]/gi, '')
      .split(',')
      .reduce((a, b) => a + parseInt(b, 10), 0)
  } else if ($uri.startsWith('/sum')) {
    answCode = 400
    answMessage = 'Bad Request'
    answBody = 'not found'
  } else {
    answCode = 404
    answMessage = 'Not Found'
    answBody = 'not found'
  }

  answHeaders =
    ['Date: ' + new Date().toUTCString(),
      'Server: Apache/2.2.14 (Win32)',
    'Content-Length: ' + ('' + answBody).length,
      'Connection: Closed',
      'Content-Type: text/html; charset=utf-8']

  outputHttpResponse(answCode, answMessage, answHeaders, answBody);
}

function parseTcpStringAsHttpRequest(string) {
  lines = string.split('\n')

  return {
    method: lines[0].split(' ')[0],
    uri: lines[0].split(' ')[1],
    headers: lines
      .slice(1, lines.indexOf(''))
      .map(x => x.split(': ')),
    body: lines.slice(lines.indexOf('') + 1, lines.indexOf('') + 2).join(),
  };
}

//console.log(contents)
http = parseTcpStringAsHttpRequest(contents);
//console.log(http)
processHttpRequest(http.method, http.uri, http.headers, http.body);
