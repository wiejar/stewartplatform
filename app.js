var net = require('net');
var http = require('http'),
fs = require('fs'),
// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

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
