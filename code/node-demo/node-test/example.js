var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write("Hello World");
  response.end();
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');

// 路由
http.createServer(function (req, res) {

  // 主页
  if (req.url == "/") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end("Welcome to the homepage!");
  }

  // About页面
  else if (req.url == "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end("Welcome to the about page!");
  }

  // 404错误
  else {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end("404 error! File not found.");
  }

}).listen(8081, "localhost");
console.log('Server running on port 8081.');


// 文件读取网页并加载
http.createServer(function (request, response) {
  fs.readFile('index.html', function readData(err, data) {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    response.write(data);
    response.end();
  });

  // 或者

  // fs.createReadStream(`${__dirname}/index.html`).pipe(response);
}).listen(8082, '127.0.0.1');

console.log('Server running on port 8082.');
