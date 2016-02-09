var net = require('net'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    index = fs.readFileSync(__dirname + '/index.html');

var app = http.createServer(function(request, response) {
    var filePath = '.' + request.url;
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
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(content, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        } else {
            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.end(content, 'utf-8');
        }
    });
});
var io = require('socket.io').listen(app);

var port = 8092;
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        io.sockets.emit('data', data.toString());
    });
    socket.on('error', function(err) {
        console.error(err);
        io.sockets.emit('error', 'error');
    });
}).listen(port);

var HTTTPort = 8008;
console.log("HTTP Server is running on port: " + HTTTPort);
console.log("Websocket Server is running on port: " + port);
app.listen(HTTTPort);