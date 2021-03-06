var http = require('http'),  
	io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io')
	sys = require('sys');

server = http.createServer(function(req, res){ 
	// your normal server code 
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	res.end('<h1>Hello world</h1>'); 
});
server.listen(8000);
  
sys.puts("Listening on 8000...");
  
// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
	// new client is here! 
	sys.puts("Client Connected!");
	client.send("hellow!");
	client.on('message', function(msg) {
		sys.puts("got: " + msg );
		client.broadcast( msg );
	});
	client.on('disconnect', function(){
		sys.puts("client disconnect!");
	});
}); 