var net = require('net');
var http = require('http'),
fs = require('fs');
var path = require('path');
// NEVER use a Sync function except at start-up!

index = fs.readFileSync(__dirname + '/index.html');
//fs.readFileSync(__dirname + '/public');
// Send index.html to all requests

var app = http.createServer(function(request, response) {
var filePath = '.' + request.url;
console.log(filePath);
if (filePath == './')
    filePath = './index.html';
var extname = path.extname(filePath);
var contentType = 'text/html';
switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break;      
    case '.jpg':
        contentType = 'image/jpg';
        break;
    case '.wav':
        contentType = 'audio/wav';
        break;
}

fs.readFile(filePath, function(error, content) {
    if (error) {
        if(error.code == 'ENOENT'){
            fs.readFile('./404.html', function(error, content) {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            });
        }
        else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            response.end(); 
        }
    }
    else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    }
});
});
var io = require('socket.io').listen(app);
// Socket.io server listens to our app
var port = 8092;
var server = net.createServer(function (socket) {
      socket.on('data', function(data) {
      io.sockets.emit('data', data.toString());
      console.log(data.toString());
      });
      socket.on('error',function(err) { 
        console.error(err);
        io.sockets.emit('error', 'error');
      }); 
    
}).listen(port);
console.log("Server is running on port: " + port);

app.listen(8008);
