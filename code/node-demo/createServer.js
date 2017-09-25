let http = require('http');
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text-plain'});
    response.end('hello world\n');
}).listen(8124);