
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
contents = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345`

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  protocolVer = 'HTTP/1.1'
  console.log(protocolVer + ' ' + statusCode + ' ' + statusMessage + '\n' +
    headers.join('\n') + '\n\n' + body);
}

function findUsrPass(usr, pass, path = "passwords.txt") {
  let content = require("fs").readFileSync(path).toString()
  return content.split('\r\n').filter(x => {
    y = x.split(':')
    return y[0] == usr && y[1] == pass
  })
}

function processHttpRequest($method, $uri, $headers, $body) {

  if ($method == 'POST' && $uri.startsWith('/api/checkLoginAndPassword')) {

    usrpass = $body.split('&').map(x => x.split('=')[1])
    try {
      if (findUsrPass(usrpass[0], usrpass[1]).length > 0) {
        answBody = '<h1 style="color:green">FOUND</h1>'
      } else {
        answBody = '<h1 style="color:red">NOT FOUND</h1>'
      }
      answCode = 200
      answMessage = 'OK'
    } catch {
      answCode = 500
      answMessage = 'Internal Server Error'
      answBody = 'not found'
    }
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
