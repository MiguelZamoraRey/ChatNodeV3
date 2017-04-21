var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

//cuanddo valla a / res envia un archivo index
app.get('/', function(req, res){
  res.sendFile(__dirname+ '/index.html');
});

//cuanddo valla a /login res envia un archivo login
app.get('/login', function(req, res){
  res.sendFile(__dirname+ '/login.html');
});

//cada vez que se conecta un usuario abre un socket
io.on('connection', function(socket){
	//notifica por consola
  console.log('a user connected');
  	//cuando desconecte notifica por consola
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  	//cuando rciba mensaje lo emite al resto de sockets abiertos
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

//servidor arrancado en el puerto port
http.listen(port, function(){
  console.log('listening on *:'+port);
});